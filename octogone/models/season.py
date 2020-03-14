from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


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

    @classmethod
    def create(cls, name, start_datetime=None, end_datetime=None):
        """
        Create a Season object
        :param name: season name UNIQUE
        :param start_datetime: start datetime of the season, can be None
        :param end_datetime: end datetime of the season, can be None
        :return:
        """
        season = cls(name=name, start_datetime=start_datetime, end_datetime=end_datetime)
        db.session.add(season)
        flush()
        return season
