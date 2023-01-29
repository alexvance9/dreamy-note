from .db import db, environment, SCHEMA, add_prefix_for_prod

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)