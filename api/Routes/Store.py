from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Store_model import StoreModel
from controllers.Store_controller import StoreController
from utils.format_date import format_datetime
from utils import main_queries


class Store_skins(Resource):
    def get(self):
        main_queries.close_conection()
        return StoreController.find_all_skins()

class Store(Resource):
    def get(self, id):
        return StoreController.find_skin(id)
        main_queries.close_conection()

    def put(self, id):
        dados = request.get_json()
        main_queries.close_conection()
        return StoreController.update_skin(id, dados)


class Store_register(Resource):
    def post(self):
        dados = request.get_json()
        return StoreController.skin_creator(dados)
