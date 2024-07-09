from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from controllers.Posts_controller import PostsController


class Posts(Resource):
    def get(self, id):
        return PostsController.show_friend_posts(id)


class Post(Resource):
    def get(self, id):
        return PostsController.find_post(id)

    def put(self, id):
        dados = request.get_json()
        return PostsController.update_post(id, dados)


class PostCreator(Resource):
    def post(self):
        dados = request.get_json()
        user_id = dados["id_user"]
        return PostsController.make_post(dados, user_id)
