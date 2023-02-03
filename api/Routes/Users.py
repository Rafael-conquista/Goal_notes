from flask_restful import Resource, reqparse
from flask import request
from sql_alchemy import banco
from models.Users_model import UsersModel

atributes = reqparse.RequestParser()


class User(Resource):
    def get(self, user_id):
        user = UsersModel.find_user(self, user_id)
        return user


class Users(Resource):
    def get(self):
        users = UsersModel.find_all_users(self)
        return users


class User_login(Resource):
    def post(self):
        login_request = request.get_json()
        login = UsersModel(login_request)
        is_logged = UsersModel.verify_login(self, login)
        if is_logged:
            return {"message": "logged successfully"}
        return {"message": "wrong login"}


class User_register(Resource):
    def post(self):
        dados = request.get_json()
        user = UsersModel(dados)
        UsersModel.save_user(user)
        return {"message": "the user has been created"}, 201
