from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


class GameRuleProfile(BaseModel):
    """
    GameRuleProfile Model
    """

    # Attributes

    mmr = db.Column(db.Float(), default=0.0, nullable=False)
    octogone_accepted = db.Column(db.Integer(), default=0, nullable=False)
    octogone_refused = db.Column(db.Integer(), default=0, nullable=False)

    # Relationships

    game_rule_id = db.Column(db.Integer, db.ForeignKey("game_rule.id"), nullable=False)
    game_profile_id = db.Column(db.Integer, db.ForeignKey("game_profile.id"), nullable=False)
    octogones = db.relationship("Octogone",
                                secondary="octogones_game_rule_profile_association",
                                lazy='subquery',
                                )

    @classmethod
    def create(cls, game_rule_id, game_profile_id):
        game_rule_profile = cls(game_profile_id=game_profile_id, game_rule_id=game_rule_id)
        db.session.add(game_rule_profile)
        flush()
        return game_rule_profile
