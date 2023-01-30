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
    Gets all journals for current user, returns journals.to_dict
    """