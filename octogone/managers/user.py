from flask import g
from octogone.managers.base_manager import BaseManager
from octogone.models import User


class UserManager(BaseManager):
    """
    Manager class for users
    This class handles all the users' methods
    """

    model = User

    def get_by_email(self, email):
        """
        Get a user via his email
        :param email: The email of the user
        :return: user instance
        """
        return self.model.query.filter_by(email=email).first()

    def create(self, args):
        """
        Create an user
        :param args: A user dict with the information wanted
        :return: user instance
        """
        user = self.model.create(args['username'],
                                 args['email'],
                                 args['password'])
        g.profileManager.create(user.id)
        return user
