from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from models.Store_model import StoreModel
from utils.format_date import format_datetime
#from controllers.Types_controller import TypesController
from utils import main_queries


class Store_skins(Resource):
    def get(self):
    #     main_queries.close_conection()
    #     return TypesController.find_all_types()
        return {"message": "teste"}

class Store(Resource):
    def get(self, id):
        # store = TypesController.find_type(id)
        # main_queries.close_conection()
        return {"message": "teste"}

    # def put(self, id):
    #     dados = request.get_json()
    #     main_queries.close_conection()
    #     return TypesController.update_type(id, dados)


class Store_register(Resource):
    def post(self):
        try:
            dados = request.get_json()
            store = StoreModel(dados)
            import ipdb; ipdb.set_trace()
            goal.initial_data = (
                format_datetime(goal.initial_data)
                if "initial_data" in dados.keys()
                    else None
            )
            goal.end_date = (
                format_datetime(goal.end_date) if "end_date" in dados.keys() else None
            )
            main_queries.save_query(store)
            return {"message": "the skin has been created"}, 201
        except:
            return {"message": "that was not possible to add this skin"}, 501
