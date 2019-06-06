from flask_restful import Resource
import random
import string
import logging

log = logging.getLogger(__name__)


sessions = {}


def random_code(length=16):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


class Session(Resource):
    def post(self):
        """create a new session

        [when user connect to the service for the first time or press the AC button,
        create a new session]
        """
        session = {'1st_operand': None, '2nd_operand': None, 'operator': None}
        token = random_code()
        sessions[token] = session

        return {'result': 0, 'token': token}, 201

    def delete(self, token):
        """delete a session

        [delete an existing sesion]

        Arguments:
            token {[string]} -- [token of session to be deleted]
        """
        if token in sessions:
            sessions.pop(token)

        return 'Successful', 200
