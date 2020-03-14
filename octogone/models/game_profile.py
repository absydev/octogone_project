from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


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

    game_rule_profiles = db.relationship("GameRuleProfile", backref="game_profile", uselist=True, lazy=True)

    @classmethod
    def create(cls, profile_id, season_id, game_id):
        """
        Create an GameProfile object
        :param profile_id: id of user Profile
        :param season_id: id of season
        :param game_id: id of game linked to this game profile
        :return: GameProfile Object
        """
        game_profile = cls(profile_id=profile_id, season_id=season_id, game_id=game_id)
        db.session.add(game_profile)
        flush()
        return game_profile

