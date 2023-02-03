from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date_created = db.Column(db.Date, nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=True)
    dreamer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))

    user = db.relationship("User", back_populates="journals")

    entries = db.relationship("Dream", back_populates="journal", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'dateCreated': self.date_created.strftime("%m-%d-%Y"),
            'lastUpdated': self.last_updated.strftime("%m/%d/%Y, %H:%M:%S"),
            'entries': [entry.to_journal_dict() for entry in self.entries]
        }
    
    
    # def set_last_updated(self):
    #     new_date = date.today()
    #     print("setting last updated to: ", new_date)
    #     self.last_updated = new_date
