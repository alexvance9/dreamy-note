from flask import Blueprint, jsonify, session, request
from datetime import date, datetime
from app.models import Dream, Journal, Tag, db
from flask_login import current_user, login_required
from app.forms import DreamForm
from.auth_routes import validation_errors_to_error_messages

dream_routes = Blueprint('dream', __name__)

# add tag to dream
@dream_routes.route('/<int:id>/tags', methods=['POST'])
@login_required
def add_tag(id):
    """
    adds tag to dream. if tag already in current dream tags, do nothing.
    return dream to_dict
    """
    print(request.json)
    tag_id = request.json["tag_id"]
    tag = Tag.query.get(int(tag_id))
    current_dream = Dream.query.get(id)
    if tag not in current_dream.tags:
        current_dream.tags.append(tag)
        db.session.add(current_dream)
        db.session.commit()
        return current_dream.to_dict(), 200
    else:
        return current_dream.to_dict(), 200


# remove tag from dream
@dream_routes.route('/<int:id>/tags', methods=['DELETE'])
@login_required
def remove_tag(id):
    """
    removes tag from current dreams tags. if tag not in current dreams tags, do nothing.
    """
    tag_id = request.json("tag_id")
    tag = Tag.query.get(int(tag_id))
    current_dream = Dream.query.get(id)   
    if tag in current_dream.tags:
        current_dream.tags.remove(tag)
        db.session.add(current_dream)
        db.session.commit()
        return current_dream.to_dict(), 200
    else:
        return current_dream.to_dict(), 200 



@dream_routes.route('', methods=['POST'])
@login_required
def create_dream():
    """
    Creates a new dream entry, returns new dream to_dict 
    """
    
    form = DreamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        journal = Journal.query.get(form.data['journal_id'])

        new_dream = Dream(
            title=form.data['title'],
            date=form.data['date'],
            body=form.data['body'],
            dreamer_id=current_user.id,
            journal_id=form.data['journal_id']
        )

        db.session.add(new_dream)
        db.session.commit()
        # journal.last_updated = datetime.now()
        return new_dream.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@dream_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_dream(id):
    """
    updates an existing dream entry, returns current dream
    DreamForm handles date which gets sent as yyy-mm-dd
    """

    form = DreamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_dream = Dream.query.get(id)
        if not current_dream:
            return {'errors': ['Could not find dream']}, 404


        current_dream.title = form.data['title']
        current_dream.date = form.data['date']
        current_dream.body = form.data['body']
        current_dream.journal_id = form.data['journal_id']

        db.session.add(current_dream)
        db.session.commit()
        # current_dream.journal.set_last_updated()
        return current_dream.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@dream_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dream(id):
    """
    deletes a dream by id, returns current user dreams 
    """
    current_dream = Dream.query.get(id)
    if not current_dream:
        return {'errors': ['Could not find dream']}, 404
    
    # current_dream.journal.set_last_updated()
    db.session.delete(current_dream)
    db.session.commit()

    return jsonify([dream.to_dict() for dream in current_user.dreams]), 200


# get single dream
@dream_routes.route('/<int:id>')
@login_required
def single_dream(id):
    """
    gets single dream, for updating single dream state to cause details rerender on FE
    """

    current_dream = Dream.query.get(id)
    if not current_dream:
        return {'errors': ['Could not find dream']}, 404
    
    return current_dream.to_dict(), 200


# get all dreams
@dream_routes.route('')
@login_required
def get_user_dreams():
    return jsonify([dream.to_dict() for dream in current_user.dreams]), 200
