from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.items_model import ItemsModel
from controllers.Items_controller import ItemsController
from utils import main_queries

# Retorna todos os itens do banco de dados
class Items(Resource):
    def get(self):
        return {"message": "Hello World"}

# Busca um ID específico
class Item(Resource):
    def get(self, id):
        Item = ItemsController.find_item(id)
        main_queries.close_conection()
        return Item
    
    def delete(self, id):
        main_queries.delete_query(self, id)
        main_queries.close_conection()
        return {"message:" "the item has been deleted"}, 202
    
    def put(self, id):
        dados = request.get_json()
        main_queries.close_conection
        return ItemsController.update_items(id, dados)


class Item_register(Resource):
    def post(self):
        try:
            dados = request.get_json() # Pegar os dados de entrada
            item = ItemsModel(dados) # Organiza os dados seguindo o ItemsModel
            main_queries.save_query(item) # Vai salvar a requisição
            return {"message": "the item has been created"}, 201
        except:
            {"message": "that was not possible to add this item"}