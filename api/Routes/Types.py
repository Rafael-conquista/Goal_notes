from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Types_model import TypesModel
from controllers.Types_controller import TypesController
from utils import main_queries


class Types(Resource):
    def get(self):
        main_queries.close_conection()
        return TypesController.find_all_types()


class Type(Resource):
    def get(self, id):
        type = TypesController.find_type(id)
        main_queries.close_conection()
        return type

    def put(self, id):
        dados = request.get_json()
        main_queries.close_conection()
        return TypesController.update_type(id, dados)


class Type_register(Resource):
    def post(self):
        try:
            dados = request.get_json()
            type = TypesModel(dados)
            main_queries.save_query(type)
            return {"message": "the type has been created"}, 201
        except:
            return {"message": "that was not possible to add this type"}
