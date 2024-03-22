from datetime import date
from flask_restful import Resource
from flask import request

from models.Items_model import ItemsModel
from controllers.Items_controller import ItemsController
from utils import main_queries
from sql_alchemy import banco

class Items(Resource):
    def get(self):
        items = ItemsController.find_all_items()
        return items
    
class Item(Resource):
    def get(self, id):
        return {"message": "this is a test"}
    
    def put(self, id):
        dados = request.get_json()
        return {"message": "this is a test2"}
    
class Items_register(Resource):
    def post(self):
        try:
            dados = request.get_json()
            item = ItemsModel(dados)
            ItemsController.create_item(dados)
            return {"message": "the item has been created"}, 201
        except:
            return{'message': "that was not possible to add this item"}