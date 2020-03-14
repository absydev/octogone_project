from octogone.managers.base_manager import BaseManager
from octogone.models import Profile


class ProfileManager(BaseManager):
    """
    Manager class for Profiles
    This class handles all the Profiles' methods
    """

    model = Profile

    def create(self, user_id):
        """
        Create a profile
        :param user_id: The user id for this profile
        :return: profile instance
        """
        profile = self.model.create(user_id)
        return profile
