from flask_restful import Resource, reqparse
from flask import request
from sql_alchemy import banco
from models.Users_model import UsersModel

atributes = reqparse.RequestParser()

class Users(Resource):
    def get(self):
        user = Users.find_users()
        #criar um controller para buscar os usuarios no banco

class User_register(Resource):
    def post(self):
        infos = atributes.parse_args()
        dados = request.get_json()
        user = UsersModel(dados)
        UsersModel.save_user(user)
        return{'message': 'the user has been created'}, 201


