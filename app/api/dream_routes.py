from flask import Blueprint, jsonify, session, request
from datetime import date
from app.models import Dream, db
from flask_login import current_user, login_required
from app.forms import DreamForm
from.auth_routes import validation_errors_to_error_messages

dream_routes = Blueprint('dream', __name__)



@dream_routes.route('/', methods=['POST'])
@login_required
def create_dream():
    """
    Creates a new dream entry, returns current user 
    Dispatch wants user to update user slice of state, which includes the users dreams.
    """
    
    form = DreamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        date_str_to_nums = form.data['date'].split('-')
        year = date_str_to_nums[0]
        month = date_str_to_nums [1]
        day = date_str_to_nums[2]

        new_dream = Dream(
            title=form.data['title'],
            date=date(year, month, day),
            body=form.data['body'],
            dreamer_id=[current_user.id]
        )

        db.session.add(new_dream)
        db.session.commit()
        return current_user.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@dream_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_dream(id):
    """
    updates an existing dream entry, returns current user 
    Dispatch wants user to update user slice of state, which includes the users dreams.
    """

    print('got here')
    form = DreamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_dream = Dream.query.get(id)
        if not current_dream:
            return {'errors': ['Could not find dream']}, 404
        # print(form.data['date'])
        # date_str_to_nums = form.data['date'].split('-')
        # year = date_str_to_nums[0]
        # month = date_str_to_nums [1]
        # day = date_str_to_nums[2]


        current_dream.title = form.data['title']
        current_dream.date = form.data['date']
        current_dream.body = form.data['body']

        db.session.add(current_dream)
        db.session.commit()
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
    
    current_dream.session.delete()
    db.session.commit()
    return current_user.to_dict(), 200

