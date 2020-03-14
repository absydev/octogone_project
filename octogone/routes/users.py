from flask import g
from flask_restx import Namespace, Resource
from flask_login import login_required

from octogone.utils.db_function import DatabaseException

api = Namespace('users', description='Users operations')


class UsersResource(Resource):
    """
    subclass of Resource with the login reauired decorator
    """


user_create_parser = api.parser()
user_create_parser.add_argument('username', required=True, help='The username')
user_create_parser.add_argument('email', required=True, help='The email address')
user_create_parser.add_argument('password', required=True, help='The password')


@api.route('/')
class UsersRest(UsersResource):
    @api.header('Authorization', 'Bearer', required=True)
    @api.doc(description='Get all users.')
    @api.response(403, 'Not Authorized')
    def get(self):
        return "Hello world", 200

    @api.doc(description='Create a new user')
    @api.expect(user_create_parser)
    @api.response(200, 'User created')
    @api.response(400, 'Bad request')
    @api.response(403, 'Not Authorized')
    def post(self):
        args = user_create_parser.parse_args()
        try:
            user = g.userManager.create(args)
            print(user)
        except ValueError as e:
            api.abort(400, 'Cannot create the user. More information: {}'.format(e))
        except DatabaseException:
            api.abort(500, 'Something went wrong. Contact your support')
        return 'User created', 200

    def delete(self):
        return("toto")
