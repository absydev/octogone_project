from octogone.models.base_model import BaseModel


class BaseManager:
    """
    Base Manager class
    """

    __abstract__ = True
    model = BaseModel

    def get(self, id):
        return self.model.query.get(id)

    def get_all(self):
        return self.model.query.all()
