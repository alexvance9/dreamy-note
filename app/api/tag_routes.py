from flask import Blueprint, jsonify, request
from app.models import Tag, db
from flask_login import current_user, login_required
from app.forms import TagForm
from.auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tag', __name__)

# create tag
@tag_routes.route('', methods=['POST'])
@login_required
def create_tag():
    """
    creates a new tag, returns new tag to_dict
    """

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            name=form.data['name'],
            dreamer_id=current_user.id
        )

        db.session.add(new_tag)
        db.session.commit()

        return new_tag.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# update tag
@tag_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_tag(id):
    """
    renames tag
    """
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_tag = Tag.query.get(id)
        if not current_tag:
            return {'errors': ['Tag does not exist']}, 404
        
        current_tag.name = form.data['name']
        db.session.add(current_tag)
        db.session.commit()
        return current_tag.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# delete tag
@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    """
    deletes a tag, returns current user?
    """
    current_tag = Tag.query.get(id)
    if not current_tag:
        return {'errors': ['Tag does not exist']}, 404
    
    db.session.delete(current_tag)
    db.session.commit()
    return current_user.to_dict(), 200
    


# get all tags
@tag_routes.route('')
@login_required
def get_all_tags():
    """
    get all tags by user
    """
    user_tags = Tag.query.filter(Tag.dreamer_id == current_user.id).all()

    return jsonify([tag.to_dict() for tag in user_tags]), 200