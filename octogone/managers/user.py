from octogone.managers.base_manager import BaseManager
from octogone.models import User


class UserManager(BaseManager):
    """
    Manager class for users
    This class handles all the users' methods
    """

    model = User

    def get_by_email(self, email):
        return self.model.query.filter_by(email=email).first()

