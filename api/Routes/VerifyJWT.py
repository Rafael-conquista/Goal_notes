from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from utils import jwt_methods


class VerifyJWT(Resource):
    def post(self):
        try:
            dados = request.get_json()
            token = dados.get("token", None)
            return jwt_methods.jwt_decode_token(token)
        except Exception:
            return {"message": False}, 404
