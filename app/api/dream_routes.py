from flask import Blueprint, jsonify, session, request
from app.models import User, Dream, db
from flask_login import current_user, login_required
from app.forms import DreamForm
from.auth_routes import validation_errors_to_error_messages

dream_routes = Blueprint('dream', __name__)


@dream_routes.route('/', methods=['POST'])
@login_required
def create_dream():
    """
    Creates a new dream entry
    """
    
    form = DreamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_dream = Dream(
            title=form.data['title'],
            date=form.data['date'],
            body=form.data['body'],
            dreamer_id=[current_user]
        )

        db.session.add(new_dream)
        db.session.commit()
        return new_dream.to_dict(), 201
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@dream_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_dream(id):
    """
    updates an existing dream entry
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

        db.session.add(current_dream)
        db.session.commit()
        return current_dream.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@dream_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dream(id):
    current_dream = Dream.query.get(id)
    if not current_dream:
        return {'errors': ['Could not find dream']}, 404
    
    current_dream.session.delete()
    db.session.commit()
    return {'success': ['Dream successfully deleted']}, 200

