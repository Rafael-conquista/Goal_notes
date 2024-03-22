from utils import main_queries
from sql_alchemy import banco
from models.Goals_model import GoalsModel
from models.Items_model import ItemsModel

class ItemsController():
    def find_all_items():
        items = main_queries.find_all_query(ItemsModel)
        item_list = []
        for item in items:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            id = item.id
            name = item.name
            descricao = item.descricao
            goals_id = item.goals_id
            item_list.append({"name": name, "id": id, "descricao": descricao, "goals_id": goals_id})
        main_queries.close_conection()
        return {"items": item_list}, 200
    
    def find_item(id):
        try:
            item = main_queries.find_query(ItemsModel, id)
            return {
                "id": item.id,
                "descricao": item.descricao,
                "ativo": item.ativo,
                "goals_id": item.goals_id,
            }, 200
        except Exception as ex:
            return {"message": ex}
        
    def create_item(dados):
        try:
            item = ItemsModel(dados)
            #import pdb; pdb.set_trace()
            if main_queries.find_query(GoalsModel, dados.get("goals_id")) == None:
                return {"message": "the item must have a goal associated with it"}, 400
            
            main_queries.save_query(item)
            return {"message": "the item has been created"}, 201
        except:
            return{'message': "that was not possible to add this item"}
        
    def update_item(id, dados):
        try:
            item = main_queries.find_query(ItemsModel, id)
            item.descricao = dados.get("descricao", item.descricao)
            item.ativo = dados.get("ativo", item.ativo)
            item.goals_id = dados.get("goals_id", item.goals_id)
            item.dataAlteracao = banco.func.now()
            main_queries.save_query(item)
            main_queries.close_conection()
            return {"message": "Item updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400