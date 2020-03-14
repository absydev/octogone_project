from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


class Game(BaseModel):
    """
    Game Model
    """

    # Attributes

    name = db.Column(db.String(80))

    # Relationships

    game_profiles = db.relationship("GameProfile", backref="game", uselist=True, lazy=True)
    game_rules = db.relationship("GameRule", backref="game", uselist=True, lazy=True)

    @classmethod
    def create(cls, name):
        game = cls(name=name)
        db.session.add(game)
        flush()
        return game
