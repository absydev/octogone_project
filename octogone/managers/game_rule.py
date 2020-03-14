from octogone.managers.base_manager import BaseManager
from octogone.models import GameRule


class GameRuleManager(BaseManager):
    """
    Manager class for GameRules
    This class handles all the GameRules' methods
    """

    model = GameRule
