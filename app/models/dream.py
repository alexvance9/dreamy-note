from .db import db, environment, SCHEMA, add_prefix_for_prod

class Dream(db.Model):
    __tablename__ = 'dreams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    body = db.Column(db.Text, nullable=False)
    # dreamer_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    dreamer = db.relationship("User", back_populates="dreams")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'body': self.body
        }