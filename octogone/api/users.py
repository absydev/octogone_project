from flask_restplus import Namespace, Resource
from flask_login import login_required

api = Namespace('/users', description='Users operations')


class UsersResource(Resource):
    """
    subclass of Resource with the login reauired decorator
    """
    method_decorators = [login_required]


@api.route('')
class UsersRest(UsersResource):
    @api.header('Authorization', 'Bearer', required=True)
    @api.doc(description='Get all users.')
    @api.response(403, 'Not Authorized')
    def get(self):
        return "Hello world", 200
