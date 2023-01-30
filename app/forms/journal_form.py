from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class JournalForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please give your Journal a Title')])
    date_created = DateField('date_created', format='%Y-%m-%d', validators=[DataRequired(message='Journal must have date created')])
    last_updated = DateField('last_updated', format='%Y-%m-%d', validators=[])
