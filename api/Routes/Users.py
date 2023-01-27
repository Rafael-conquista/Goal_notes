from flask_restful import Resource, reqparse
from flask import request
from sql_alchemy import banco
from models import Users

atributes = reqparse.RequestParser()

class Users(Resource):
    def get(self):
        user = Users.find_users()
        #criar um controller para buscar os usuarios no banco

class User_register(Resource):
    def post(self):
        dados = request.get_json()
        name = dados['name']
        surname = dados['surname']
        password = dados['password']
        birthday = dados['birthday']

        user.save_user()
        #criar controller para salvar o post
        return{'message': 'the user has been created'}, 201
        pass
        import ipdb; ipdb.set_trace()


