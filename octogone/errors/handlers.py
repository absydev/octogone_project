from octogone.errors import bp
from octogone.api.errors import error_response
from flask import current_app


@bp.app_errorhandler(404)
def not_found_error(error):
    current_app.logger.error(error)
    return error_response(404)


@bp.app_errorhandler(500)
def internal_error(error):
    current_app.logger.error(error)
    return error_response(500)
