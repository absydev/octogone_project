from flask import Flask
from octogone.config import Config
import logging
import os
from flask_mail import Mail
from flask_login import LoginManager
from logging.handlers import SMTPHandler, RotatingFileHandler

# Init Flask's module.
login = LoginManager()
login.login_view = 'auth.login'
login.login_message = 'Please log in to access this page'
mail = Mail()


def create_app(config_class=Config):
    """
    Flask Application Factory
    :param config_class: Configuration Class.
    :return: A Flask Application.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    login.init_app(app)
    mail.init_app(app)

    from octogone.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from octogone.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    if not app.debug and not app.testing:
        if app.config['MAIL_SERVER']:
            auth = None
            if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
                auth = (app.config['MAIL_USERNAME'],
                        app.config['MAIL_PASSWORD'])
            secure = None
            if app.config['MAIL_USE_TLS']:
                secure = ()
            mail_handler = SMTPHandler(
                mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                fromaddr='no-reply@' + app.config['MAIL_SERVER'],
                toaddrs=app.config['ADMINS'], subject='ViewCraft Failure',
                credentials=auth, secure=secure)
            mail_handler.setLevel(logging.ERROR)
            app.logger.addHandler(mail_handler)

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/octogone_api.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)

    app.logger.info('Octogone startup')
    return app
