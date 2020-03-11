from flask_restx import Namespace, Resource
from flask_login import login_required
from octogone.business.user_manager import UserManager

api = Namespace('users', description='Users operations')


class UsersResource(Resource):
    """
    subclass of Resource with the login reauired decorator
    """


@api.route('/')
class UsersRest(UsersResource):
    @api.header('Authorization', 'Bearer', required=True)
    @api.doc(description='Get all users.')
    @api.response(403, 'Not Authorized')
    def get(self):
        return "Hello world", 200

    def post(self):
        return 'toto3', 300

    def delete(self):
        return("toto")
