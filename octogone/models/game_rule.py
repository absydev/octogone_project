from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


class GameRule(BaseModel):
    """
    GameRule Model
    """

    # Attributes

    text = db.Column(db.String())
    ranked = db.Column(db.Boolean(), default=False, nullable=False)

    # Relationships

    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)
    game_rule_profiles = db.relationship("GameRuleProfile", backref="game_rule", uselist=True, lazy=True)

    @classmethod
    def create(cls, text, ranked, game_id):
        game_rule = cls(text=text, ranked=ranked, game_id=game_id)
        db.session.add(game_rule)
        flush()
        return game_rule
