from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class JournalForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please give your Dream a Title')])
    last_updated = DateField('date', format='%Y-%m-%d', validators=[DataRequired(message='When did you have this Dream?')])
