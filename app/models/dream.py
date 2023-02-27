from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tag import dream_tags

class Dream(db.Model):
    __tablename__ = 'dreams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    body = db.Column(db.Text, nullable=False)
    dreamer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))
    journal_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('journals.id'), ondelete="CASCADE"))

    dreamer = db.relationship("User", back_populates="dreams", )

    journal = db.relationship("Journal", back_populates="entries")

    tags = db.relationship("Tag", secondary=dream_tags, back_populates="dreams")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.strftime("%Y-%m-%d"),
            'body': self.body,
            'journal': self.journal.to_dict(),
            'tags': [tag.to_dict() for tag in self.tags]
        }
    

    def to_journal_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.strftime("%Y-%m-%d"),
            'body': self.body
        }