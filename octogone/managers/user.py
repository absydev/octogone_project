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

    def get_by_username(self, username):
        """
        Get a user via his email
        :param username: The name of the user
        :return: user instance
        """
        return self.model.query.filter_by(username=username).first()

    def create(self, args):
        """
        Create an user
        :param args: A user dict with the information wanted
        :return: user instance
        """
        if self.get_by_email(args['email']):
            raise ValueError('Email already used')
        if self.get_by_username(args['username']):
            raise ValueError('Username already taken')

        user = self.model.create(args['username'],
                                 args['email'],
                                 args['password'])
        g.profileManager.create(user.id)
        return user
