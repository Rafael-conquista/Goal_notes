from utils import main_queries
from sql_alchemy import banco
from models.Store_model import StoreModel
from utils.format_date import format_to_string, format_datetime


class StoreController:
    def find_all_skins():
        skins = main_queries.find_all_query(StoreModel)
        skin_list = []
        for skin in skins:
            obs = skin.initial_data
            skin_list.append({
                "id": skin.id,
                "rarity": skin.id,
                "initial_date": format_to_string(skin.initial_data),
                "end_date": format_to_string(skin.end_date),
                "price": skin.price,
                "active": skin.active
            })
        main_queries.close_conection()
        return {"skins": skin_list}, 200

    def find_skin(id):
        try:
            skin = main_queries.find_query(StoreModel, id)
            return {
                "id": skin.id,
                "rarity": skin.id,
                "initial_date": format_to_string(skin.initial_data),
                "end_date": format_to_string(skin.end_date),
                "price": skin.price,
                "active": skin.active
            }, 200
        except Exception as ex:
            return {"message": ex}
        
    def skin_creator(dados):
        try:
            store = StoreModel(dados)
            
            store.initial_data = (
                format_datetime(store.initial_data)
                if "initial_data" in dados.keys()
                    else None
            )
            store.end_date = (
                format_datetime(store.end_date) if "end_date" in dados.keys() else None
            )
            import ipdb; ipdb.set_trace()
            main_queries.save_query(store)
            return {"message": "the skin has been created"}, 201
        except:
            return {"message": "that was not possible to add this skin"}, 501

    def update_skin(id, dados):
        try:
            skin = main_queries.find_query(StoreModel, id)
            skin.rarity = dados.get("rarity", skin.rarity)
            skin.initial_data = dados.get("initial_data", skin.initial_data)
            skin.end_date = dados.get("end_date", skin.end_date)
            skin.price = dados.get("price", skin.price)
            skin.active = dados.get("active", skin.active)
            skin.dataAlteracao = banco.func.now()
            main_queries.save_query(skin)
            main_queries.close_conection()
            return {"message": "skin updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
