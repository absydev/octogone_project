from octogone import db
from octogone.models.base_model import BaseModel


class Season(BaseModel):
    """
    Season Model
    """

    # Attributes

    name = db.Column(db.String(80), nullable=False)
    start_datetime = db.Column(db.DateTime())
    end_datetime = db.Column(db.DateTime())

    # Relationships

    game_profiles = db.relationship("GameProfile", backref="season", uselist=True, lazy=True)
