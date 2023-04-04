from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Types_model import TypesModel

class Types(Resource):
    def get(self):
        types = TypesModel.find_all_types()
        return types
    
class Type(Resource):
    def get(self, id):
        type = TypesModel.find_type(self, id)
        return type

    def post(self):
        dados = request.get_json()
        type = TypesModel(dados)
        TypesModel.save_type(type)
        return {"message": "the type has been created"}, 201
    
    def delete(self, id):
        TypesModel.delete_type(self, id)
        return {"message": "the type has been deleted"}, 202
    
    def put(self, id):
        dados = request.get_json()
        message = TypesModel.update_type(self, id, dados)
        return message
    

