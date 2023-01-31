from datetime import date
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def not_future(form, field):
    if field.data > date.today():
        raise ValidationError('Dream date cannot be in the future.')

class DreamForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please give your Dream a Title')])
    date = DateField('date', format='%Y-%m-%d', validators=[DataRequired(message='When did you have this Dream?'), not_future])
    journal_id = IntegerField('journal_id', validators=[DataRequired(message='Please select a Journal for your dream.')])
    body = TextAreaField('body', validators=[DataRequired(message='Describe your dream')])
