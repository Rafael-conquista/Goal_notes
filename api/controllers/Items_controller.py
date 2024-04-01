from utils import main_queries
from models.items_model import ItemsModel


class ItemsController:
    def find_all_items():

        items = main_queries.find_all_query(ItemsModel)

        item_list = []

        for item in items:

            id = item.id
            goals_id = item.goals_id
            desc = item.desc

            item_list.append({"item_id": id, "goals_id": goals_id, "desc": desc})

        main_queries.close_conection()

        return {"item": item_list}, 200

    def find_item(id):

        try:

            item = main_queries.find_query(ItemsModel, id)

            return {"id": item.id, "goals_id": item.goals_id, "desc": item.desc}, 200

        except Exception as ex:
            return {"message": ex}

    def update_item(id, dados):
        try:

            item = main_queries.find_query(ItemsModel, id)
            item.desc = dados.get("desc", item.desc)
            main_queries.save_query(item)

            main_queries.close_conection()

            return {"message": "Item updated successfully"}, 200

        except Exception as error:
            return {"message": error}, 400
