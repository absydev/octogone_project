from octogone import db
from octogone.models.base_model import BaseModel


class Profile(BaseModel):
    """
    Profile Model
    """

    # Attributes

    global_mmr = db.Column(db.Float, default=0.0, nullable=False)
    trust_score = db.Column(db.Float, default=0.0, nullable=False)
    pussy_score = db.Column(db.Float, default=0.0, nullable=False)

    # Relationships

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    game_profiles = db.relationship("GameProfile", backref="profile", lazy=True, uselist=True)
