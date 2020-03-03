"""Module for errors handlers definitions and management"""

from flask import Blueprint

bp = Blueprint('errors', __name__)

from octogone.errors import handlers
