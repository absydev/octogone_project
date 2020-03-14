from octogone import db
from octogone.models.base_model import BaseModel


class Game(BaseModel):
    """
    Game Model
    """

    # Attributes

    name = db.Column(db.String(80))

    # Relationships

    game_profiles = db.relationship("GameProfile", backref="game", uselist=True, lazy=True)
    game_rules = db.relationship("GameRule", backref="game", uselist=True, lazy=True)
