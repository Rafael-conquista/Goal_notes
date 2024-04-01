from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.items_model import ItemsModel
from models.Goals_model import GoalsModel
from controllers.Items_controller import ItemsController
from utils import main_queries
from utils.format_date import format_datetime


# Retorna todos os itens do banco de dados
class Items(Resource):
    def get(self):
        items = ItemsController.find_all_items()
        return items


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
        return ItemsController.update_item(id, dados)


class Item_register(Resource):
    def post(self):
        dados = request.get_json()
        goal_id = dados.get("goals_id", None)
        goal = main_queries.find_query(
            GoalsModel, goal_id
        )  # VERIFICA SE JÁ TEM UMA META CRIADA, SE NÃO TIVER, EXIBE MENSAGEM DE ERRO.
        if not goal:
            return {"message": "Goal not found"}

        item = ItemsModel(dados)
        import ipdb

        ipdb.set_trace()
        item.dataCadastro = (
            format_datetime(item.dataCadastro)
            if "dataCadastro"
            in dados.keys()  # Se já tiver informações nessa chave, ele ignora.
            else None  # Se não tiver, ele passar o None para ele.
        )
        main_queries.save_query(item)
        return {"message": "the item has been created"}, 201
