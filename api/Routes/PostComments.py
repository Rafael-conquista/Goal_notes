from sql_alchemy import banco
from flask_restful import Resource
from controllers.Comments_controller import CommentsController
from flask import request


class Comments(Resource):
    def get(self):
        return CommentsController.find_all_comments(self)

class Comment(Resource):
    def get(self, id):
        return CommentsController.find_comment(id)

    def put(self, id):
        import ipdb; ipdb.set_trace()
        dados = request.get_json()
        return CommentsController.update_comment(id, dados)

class PostComment(Resource):
    def post(self):
        dados = request.get_json()
        user_id = dados['id_user']
        return CommentsController.make_comment(self, dados, user_id)

