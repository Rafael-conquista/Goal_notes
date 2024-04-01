from flask_restful import Resource
from flask import request
from models.Users_model import UsersModel
from controllers.Users_controller import UsersController
from utils import main_queries
from controllers.Amigos_controller import AmigosController


class Amigo(Resource):
    def get(self):
        dados = request.get_json()
        id_usuario_enviado = dados["id_usuario_enviado"]
        id_usuario_recebido = dados["id_usuario_recebido"]
        return AmigosController.find_friend(id_usuario_enviado, id_usuario_recebido)


class Amigos(Resource):
    def get(self):
        return AmigosController.find_all_friend(self)


class Amigos_registro(Resource):
    def post(self):
        dados = request.get_json()
        user_id = dados["user_id"]
        user_friend_id = dados["user_friend_id"]

        return AmigosController.make_friend(dados, user_id, user_friend_id)


class Amigo_desfazer(Resource):
    def put(self):
        dados = request.get_json()
        id_amizade = dados["id_amizade"]

        return AmigosController.update_amigo(dados, id_amizade)
