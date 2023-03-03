from .db import db, environment, SCHEMA, add_prefix_for_prod

dream_tags = db.Table(
    "dream_tags",
    db.Column(
        "dream_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("dreams.id")),
        primary_key=True),
    db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("tags.id")),
        primary_key=True
    )
)

if environment == 'production':
    dream_tags.schema = SCHEMA

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    dreamer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))

    user = db.relationship("User", back_populates="tags")

    dreams = db.relationship("Dream", secondary=dream_tags, back_populates="tags")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'refsCount': len([dream for dream in self.dreams])
        }