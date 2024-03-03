from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from utils import main_queries


class Posts(Resource):
    def get(self):
        return {"msg": "ta funcionando"}


class Post(Resource):
    def get(self, id):
        return {"msg": "ta funcionando"}

    def put(self, id):
        return {"msg": "ta funcionando"}

class PostCreator(Resource):
    def post():
        return {"msg": "ta funcionando"}

