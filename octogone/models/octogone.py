import enum

from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


class Status(enum.Enum):
    """
    Enum class for Octogone Status
    """
    WAITING = "waiting"
    ACCEPTED = "accepted"
    REFUSED = "refused"


class Octogone(BaseModel):
    """
    Octogone Model
    """

    # Attributes

    status = db.Column(db.String(), default=Status.WAITING.value, nullable=False)
    ranked = db.Column(db.Boolean(), default=False, nullable=False)
    closed_datetime = db.Column(db.DateTime())

    # Relationships

    game_rule_profiles = db.relationship(
        "GameRuleProfile",
        secondary="octogones_game_rule_profile_association",
        lazy='subquery'
    )

    @classmethod
    def create(cls, ranked, game_rule_profile):
        octogone = cls(ranked)
        octogone.game_rule_profiles.append(game_rule_profile)
        db.session.add(octogone)
        flush()
        return octogone
