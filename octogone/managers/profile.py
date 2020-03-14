from octogone.managers.base_manager import BaseManager
from octogone.models import Profile


class ProfileManager(BaseManager):
    """
    Manager class for Profiles
    This class handles all the Profiles' methods
    """

    model = Profile
