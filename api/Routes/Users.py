from flask_restful import Resource, reqparse
from flask import request
from sql_alchemy import banco
from models.Users_model import UsersModel

atributes = reqparse.RequestParser()


class User(Resource):
    def get(self, user_id):
        user = UsersModel.find_user(self, user_id)
        return user

    def delete(self, user_id):
        UsersModel.delete_user(self, user_id)

    def put(self, user_id):
        dados = request.get_json()
        message = UsersModel.update_user(self, user_id, dados)
        return message


class Users(Resource):
    def get(self):
        users = UsersModel.find_all_users(self)
        return users


class User_login(Resource):
    def post(self):
        login_request = request.get_json()
        login = UsersModel(login_request)
        login_message = UsersModel.verify_login(self, login)
        return login_message


class User_logoff(Resource):
    def post(self):
        logoff_request = request.get_json()
        logoff = UsersModel(logoff_request)
        loggof_message = UsersModel.verify_logoff(self, logoff)
        return {"message": "finalizado"}


class User_register(Resource):
    def post(self):
        dados = request.get_json()
        user = UsersModel(dados)
        UsersModel.save_user(user)
        return {"message": "the user has been created"}, 201


# User_update
