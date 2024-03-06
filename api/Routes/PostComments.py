from sql_alchemy import banco
from flask_restful import Resource


class Comments(Resource):
    def get(self):
        return {"message": "teste"}


class Comment(Resource):
    def get(self, id):
        return {"message": "teste"}

    def put(self, id):
        return {"message": "teste"}

class PostComment(Resource):
    def post(self):
        return {"message": "teste"}

