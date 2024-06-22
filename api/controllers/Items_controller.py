from utils import main_queries, format_date
from sql_alchemy import banco
from models.items_model import ItemsModel
from controllers.Goals_controller import GoalsController


class ItemsController:
    def find_all_items():

        items = main_queries.find_all_query(ItemsModel)

        item_list = []

        for item in items:

            id = item.id
            goals_id = item.goals_id
            desc = item.desc

            item_list.append({"item_id": id, "goals_id": goals_id, "desc": desc, "ativo": item.ativo})

        main_queries.close_conection()

        return {"item": item_list}, 200

    def find_item(id):

        try:

            item = main_queries.find_query(ItemsModel, id)
            return {"id": item.id, "goals_id": item.goals_id, "desc": item.desc, "ativo": item.ativo}, 200

        except Exception as ex:
            return {"message": ex}

    def update_item(id, dados):
        try:

            item = main_queries.find_query(ItemsModel, id)
            item.desc = dados.get("desc", item.desc)
            item.ativo = dados.get("ativo", item.ativo)
            main_queries.save_query(item)

            main_queries.close_conection()

            return {"message": "Item updated successfully"}, 200

        except Exception as error:
            return {"message": error}, 400
    
    def find_items_by_goal(goal_id):
        try:
            goal = GoalsController.find_goal(goal_id)
            if goal[0]['id']:
                items = (
                    banco.session.query(ItemsModel)
                    .filter(ItemsModel.goals_id == goal_id)
                    .all()
                )
            
            organized_items = {}
            cont = 0
            for item in items:
                if not item.excluido:
                    item_object = {
                        "id": item.id,
                        "desc": item.desc,
                        "ativo": item.ativo
                    }
                    organized_items.update({cont: item_object})
                    cont = cont + 1
            return organized_items
        except:
            return {"message": "Items not found"}
