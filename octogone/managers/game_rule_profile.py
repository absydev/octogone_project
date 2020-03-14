from octogone.managers.base_manager import BaseManager
from octogone.models import GameRuleProfile


class GameRuleProfileManager(BaseManager):
    """
    Manager class for GameRuleProfiles
    This class handles all the GameRuleProfiles' methods
    """

    model = GameRuleProfile
