from octogone.managers.base_manager import BaseManager
from octogone.models import Game


class GameManager(BaseManager):
    """
    Manager class for Games
    This class handles all the Games' methods
    """

    model = Game

