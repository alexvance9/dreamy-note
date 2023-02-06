from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class JournalForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please give your Journal a Title')])
    # is_default = BooleanField('is_default', validators=[DataRequired(message="is this the default journal?")])
   
