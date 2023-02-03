from flask import Blueprint, jsonify, session, request
from datetime import date
from app.models import Dream, Journal, db
from flask_login import current_user, login_required
from app.forms import DreamForm
from.auth_routes import validation_errors_to_error_messages

dream_routes = Blueprint('dream', __name__)



@dream_routes.route('', methods=['POST'])
@login_required
def create_dream():
    """
    Creates a new dream entry, returns current user 
    Dispatch wants user to update user slice of state, which includes the users dreams.
    also updates journal.last_updated
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
        return current_user.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@dream_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_dream(id):
    """
    updates an existing dream entry, returns current user 
    Dispatch wants user to update user slice of state, which includes the users dreams.
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
        return current_user.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@dream_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dream(id):
    """
    deletes a dream by id, returns current user 
    Dispatch wants user to update user slice of state, which includes the users dreams.
    """
    current_dream = Dream.query.get(id)
    if not current_dream:
        return {'errors': ['Could not find dream']}, 404
    
    # current_dream.journal.set_last_updated()
    db.session.delete(current_dream)
    db.session.commit()

    return current_user.to_dict(), 200


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