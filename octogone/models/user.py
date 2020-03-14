from octogone import db
from octogone.models.base_model import BaseModel
from octogone.utils.db_function import flush


class User(BaseModel):
    """
    User class
    """

    # Attributes

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80))

    # Relationships

    profile = db.relationship("Profile", backref='user', uselist=False)

    @classmethod
    def create(self, username, email, password):
        """
        Create an user
        :param username: must be UNIQUE
        :param email: must be UNIQUE
        :param password: HASHed password, not CLEAR password.
        :return: user instanciate
        """
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        flush()
        return user
