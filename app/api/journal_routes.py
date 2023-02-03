from flask import Blueprint, jsonify, session, request
from datetime import date
from app.models import Journal, db
from flask_login import current_user, login_required
from app.forms import JournalForm
from.auth_routes import validation_errors_to_error_messages

journal_routes = Blueprint('journal', __name__)

# get all journals
@journal_routes.route('')
@login_required
def get_journals():
    """
    Gets all journals for current user, 
    front end will parse journals attr into journals state
    """
    user_journals = Journal.query.filter(Journal.dreamer_id == current_user.id).all()

    return jsonify([journal.to_dict() for journal in user_journals]), 200



# get single journal by id
@journal_routes.route('/<int:id>')
@login_required
def get_single_journal(id):
    """
    get single journal by id
    """

    journal = Journal.query.get(id)
    if not journal:
        return {'errors': ['Could not find Journal']}, 404
    
    return journal.to_dict(), 200


# create new journal
@journal_routes.route('', methods=['POST'])
@login_required
def create_journal():
    """
    Creates a new journal, returns journal.to_dict
    """
    print('got to journal route')
    form = JournalForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_journal = Journal(
            title=form.data["title"],
            date_created=date.today(),
            # last_updated=date.today(),
            dreamer_id=current_user.id
        )

        db.session.add(new_journal)
        db.session.commit()
        return new_journal.to_dict(), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# update journal
@journal_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_journal(id):
    """
    updates journal title only
    """
    current_journal = Journal.query.get(id)
    if not current_journal:
        return {'errors': ['Could not find journal']}, 404
    
    form = JournalForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_journal.title = form.data['title']

        db.session.add(current_journal)
        db.session.commit()
        
        return current_journal.to_dict(), 201



# delete journal
@journal_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_journal(id):
    """
    deletes a journal and all of it's entries, 
    returns current_user.to_dict()
    """
    current_journal = Journal.query.get(id)
    if not current_journal:
        return {'errors': ['Could not find journal']}, 404
    
    db.session.delete(current_journal)
    db.session.commit()
    return current_user.to_dict(), 200
