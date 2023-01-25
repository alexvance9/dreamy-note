from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class DreamForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please give your Dream a Title')])
    date = DateField('date', validators=[DataRequired(message='When did you have this Dream?')])
    body = TextAreaField('body', validators=[DataRequired(message='Describe your dream')])
