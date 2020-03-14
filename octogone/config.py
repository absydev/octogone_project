import os

basedir = os.path.abspath(os.path.dirname(__file__))
sqlite_file = os.path.join(basedir, "octogone.db")

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'supersecret'

    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI") or f"sqlite:///{sqlite_file}"
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', True) is not None
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = os.environ.get("ADMINS")
    LANGUAGES = ['en', 'fr']
