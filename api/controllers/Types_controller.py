from utils import main_queries
from models.Types_model import TypesModel

class TypesController():
    def find_all_types():
        types = main_queries.find_all_query(TypesModel)
        type_list = []
        for type in types:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            id = type.id
            name = type.name
            obs = type.obs
            type_list.append({"name": name, "id": id, "obs": obs})

        return {"types": type_list}, 200

    def find_type(id):
        try:
            type = main_queries.find_query(TypesModel, id)
            return {
                "id": type.id,
                "name": type.name,
                "obs": type.obs,
            }, 200
        except Exception as ex:
            return {"message": ex}
        
    def update_type(id, dados):
        try:
            type = main_queries.find_query(TypesModel, id)
            type.name = dados.get("name", type.name)
            type.obs = dados.get("obs", type.obs)
            main_queries.save_query(type)
            return {"message": "Type updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400