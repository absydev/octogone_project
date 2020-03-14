from octogone import db
from octogone.models.base_model import BaseModel


class GameProfile(BaseModel):
    """
    GameProfile Model
    """

    # Attributes

    mmr = db.Column(db.Float(), default=0.0, nullable=False)

    # Relationships

    profile_id = db.Column(db.Integer, db.ForeignKey("profile.id"), nullable=False)
    season_id = db.Column(db.Integer, db.ForeignKey("season.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)

