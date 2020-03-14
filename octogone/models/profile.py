from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


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

    @classmethod
    def create(cls, user_id):
        """
        Create a Profile
        :param user_id: User_id
        :return: Profile object
        """
        profile = cls(user_id=user_id)
        db.session.add(profile)
        flush()
        return profile
