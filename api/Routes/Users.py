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
