from .db import db, environment, SCHEMA, add_prefix_for_prod

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date_created = db.Column(db.Date, nullable=False)
    last_updated = db.Column(db.Date, nullable=True)
    dreamer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship("User", back_populates="journals")

    entries = db.relationship("Dream", back_populates="journal")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'dateCreated': self.date_created,
            'lastUpdated': self.last_updated,
            'entries': self.entries
        }