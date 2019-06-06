from flask_restful import Resource
from .session import sessions
import logging

log = logging.getLogger(__name__)


class Operand(Resource):
    def post(self, operand, token):
        """submit an operand

        [submit an operand]

        Arguments:
            operand {[string]} -- [a number]
            token {[string]} -- [token of user's session]
        """
        if token in sessions:
            session = sessions[token]
            if not session['1st_operand']:
                session['1st_operand'] = operand
            else:
                session['2nd_operand'] = operand

            return {'result': operand}, 200
