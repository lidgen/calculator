from flask_restful import Resource
import math
from .session import sessions
import logging

log = logging.getLogger(__name__)


def to_num(op):
    if isinstance(op, str):
        if '.' in op:
            return float(op)
        else:
            return int(op)
    else:
        return op


def calculate(op1, op2, operator):
    op1 = to_num(op1)
    op2 = to_num(op2)
    ret = 0
    if operator == 'plus':
        ret = op1 + op2
    elif operator == 'minus':
        ret = op1 - op2
    elif operator == 'time':
        ret = op1 * op2
    elif operator == 'divide':
        if op2 is 0:
            ret = math.inf
            return ret, 'Error, division by 0'
        ret = op1 / op2

    return ret, None


class Operator(Resource):

    def post(self, operator, token):
        """Post a new operator

        [description]

        Arguments:
            operator {[string]} -- plus, minus, time, divide, equal
            token {[string]} -- [for each client use different token]
        """
        if token in sessions:
            session = sessions[token]
            if session['1st_operand'] and session['2nd_operand'] and session['operator']:
                ret, msg = calculate(session['1st_operand'], session['2nd_operand'], session['operator'])
                session['2nd_operand'] = None
                if msg:
                    session['1st_operand'] = None
                    session['operator'] = None
                    return {'message': msg}, 400
                else:
                    session['1st_operand'] = ret
                    session['operator'] = operator
                    return {'result': ret}, 200

                if operator == 'equal':
                    session['operator'] = None
            else:
                session['operator'] = None if operator == 'equal' else operator

                return {'result': session['1st_operand']}, 200
