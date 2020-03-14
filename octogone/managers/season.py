from octogone.managers.base_manager import BaseManager
from octogone.models import Season


class SeasonManager(BaseManager):
    """
    Manager class for Seasons
    This class handles all the Seasons' methods
    """

    model = Season
