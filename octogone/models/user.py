from octogone import db
from octogone.models.base_model import BaseModel


class User(BaseModel):
    """
    User class
    """

    # Attributes

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80))

    # Relationships

    profile = db.relationship("Profile", backref='user', uselist=False)
