from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Cap_model import CapModel
from models.Users_model import UsersModel
from controllers.Cap_controller import CapController
from utils import main_queries


class Cap(Resource):
    def get(self, id):
        cap = CapController.find_cap(id)
        main_queries.close_conection()
        return cap

    def put(self, id):
        dados = request.get_json()
        main_queries.close_conection()
        return CapController.update_cap(id, dados)


class Cap_register(Resource):
    def post(self):
        dados = request.get_json()
        return CapController.post_cap(dados)

class Users_cap(Resource):
    def get(self, id):
        user = main_queries.find_query(UsersModel, id)
        cap = CapController.find_users_cap(user)
        return {"id": cap.id, "skin": cap.selected_skin, "name": cap.name}, 200