from flask_restful import Resource
from flask import request
from models.Users_model import UsersModel
from controllers.Users_controller import UsersController
from utils import main_queries
from utils import jwt_methods


class User(Resource):
    def get(self, user_id):
        user = UsersController.find_user(user_id)
        return user

    def put(self, user_id):
        dados = request.get_json()
        message = UsersController.update_user(user_id, dados)
        return message
    
class User_consult(Resource):
    def post(self):
        dados = request.get_json()
        apelido = dados["apelido"]
        id = dados["id"]
        idUsuario = dados["idUsuario"]
        return UsersController.find_user_apelido(apelido, id, idUsuario)


class Users(Resource):
    def get(self):
        users = UsersController.find_all_users()
        return users


class User_login(Resource):
    def post(self):
        login_request = request.get_json()
        login = UsersModel(login_request)
        login_message = UsersController.verify_login(login)
        return login_message


class User_register(Resource):
    def post(self):
        dados = request.get_json()
        user = UsersModel(dados)
        main_queries.save_query(user)
        token = jwt_methods.jwt_create_token(user.id)
        return {"message": "the user has been created", "token": token}, 201

class User_Conquista(Resource):
    def get(self, user_id):
        user = UsersController.find_user_conquistas(user_id)
        return user

class ConquistaAll(Resource):
    def get(self, user_id):
        conquistas = UsersController.find_conquistas(user_id)
        return conquistas
