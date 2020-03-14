import datetime

from octogone import db
from octogone.utils.db_function import flush


class BaseModel(db.Model):
    """
    Base Model class
    """

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    creation_datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)
    modification_datetime = db.Column(db.DateTime, onupdate=datetime.datetime.utcnow)

    @property
    def redis_key(self):
        """
        Redis key for this ressource
        :return: To override in all models.
        """
        pass

    def __repr__(self):
        return f"{self.__table__}:{self.id}"

    def update(self, dict):
        for attribute in dict:
            setattr(self, attribute, dict[attribute])
        flush()
