from flask import Blueprint, current_app, request, make_response
from flask_restplus import Api
import json
from octogone.api.users import api as ns_users
from octogone.api.users import api as users_ns

bp = Blueprint('api', __name__)

api = Api(
    bp,
    title='Octogone API',
    version='1.0',
    description='Octogone API for manage battles',
    doc='/doc'
)

api.add_namespace(ns_users)


@api.representation('application/json')
def restful_output_json(data, code, headers=None):
    """Makes a Flask response with a JSON encoded body"""

    if current_app.debug or request.headers.get('X-Pretty-JSON', 0) == "1":
        dumped = json.dumps(data, indent=4, sort_keys=True, ensure_ascii=False) + "\n"
    else:
        dumped = json.dumps(data, ensure_ascii=False) + "\n"

    resp = make_response(dumped, code)
    resp.headers.extend(headers or {})
    if code == 204:
        resp.headers['Content-Length'] = 0
    return resp


@bp.before_request
def before_request():
    """Before request for API Blueprint
    """
    pass


@bp.after_request
def after_request(resp):
    """
    """
    return resp
