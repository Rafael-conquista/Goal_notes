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
    def get(self, user_id):
        main_queries.close_conection()
        return StoreUsersController.find_itens_active(user_id)

class Itens_register_by_user(Resource):
    def post(self):
        dados = request.get_json()
        preco = dados["preco"]
        capCoins = dados["capCoins"]
        idUsuario = dados["idUsuario"]
        idStore = dados["idStore"]
        return StoreUsersController.iten_create(preco, capCoins, idUsuario, idStore)
    

class Active_iten_user(Resource):
    def put(self):
        dados = request.get_json()
        idSkin = dados["idSkin"]
        validacao = dados["validacao"]
        return StoreUsersController.active_iten_user(idSkin, validacao)


