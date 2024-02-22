from flask_restful import Resource
from flask import request
from models.Users_model import UsersModel
from controllers.Users_controller import UsersController
from utils import main_queries


class User(Resource):
    def get(self, user_id):
        user = UsersController.find_user(user_id)
        return user

    def delete(self, user_id):
        main_queries.delete_query(UsersModel, user_id)
        return {"message": "it has been delete"}

    def put(self, user_id):
        dados = request.get_json()
        message = UsersController.update_user(user_id, dados)
        return message


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


class User_logoff(Resource):
    def post(self):
        logoff_request = request.get_json()
        logoff = UsersModel(logoff_request)
        loggof_message = UsersController.verify_logoff(logoff)
        return {"message": "finalizado"}


class User_register(Resource):
    def post(self):
        dados = request.get_json()
        user = UsersModel(dados)
        main_queries.save_query(user)
        return {"message": "the user has been created"}, 201

