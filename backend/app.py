from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api import Operator, Operand, Session
import os
import logging.config
from datetime import timedelta


logging.config.fileConfig('logging.yml', disable_existing_loggers=False)
log = logging.getLogger(__name__)


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)

    api = Api(app)
    api.add_resource(Operand, "/operand/<operand>/<token>")
    api.add_resource(Operator, "/operator/<operator>/<token>")
    api.add_resource(Session, "/session", "/session/<token>")

    CORS(app, support_credentials=True)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
