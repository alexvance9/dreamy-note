from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError

class TagForm(FlaskForm):
    name = StringField('title', validators=[DataRequired(message='Tag must have a name.'), Length(min=1, max=20, message='Tag name must be between 1 and 20 characters.')])