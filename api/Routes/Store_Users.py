from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Store_Users_model import StoreUsersModel
from controllers.Store_Users_controller import StoreUsersController
from utils.format_date import format_datetime
from utils import main_queries


class Itens_by_user(Resource):
    def get(self, user_id):
        main_queries.close_conection()
        return StoreUsersController.find_itens(user_id)

class Itens_active_by_user(Resource):
    def get(self, user_id, type):
        main_queries.close_conection()
        return StoreUsersController.find_itens_active(user_id, type)

class Itens_register_by_user(Resource):
    def post(self):
        dados = request.get_json()
        preco = dados["preco"]
        capcoins = dados["capcoins"]
        idUsuario = dados["idUsuario"]
        idStore = dados["idStore"]
        return StoreUsersController.iten_create(preco, capcoins, idUsuario, idStore)
    

class Active_iten_user(Resource):
    def put(self):
        dados = request.get_json()
        idSkin = dados["idSkin"]
        validacao = dados["validacao"]
        type = dados["type"]
        return StoreUsersController.active_iten_user(idSkin, validacao, type)


