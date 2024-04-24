from utils import main_queries
from models.Cap_model import CapModel
from models.Users_model import UsersModel
from sql_alchemy import banco

class CapController:
    def find_users_cap(user):
        return banco.session.query(CapModel).filter(CapModel.id_user == user.id).first()

    def post_cap(dados):
        user = main_queries.find_query(UsersModel, dados['id_user'])
        if not user:
            return {"message": "user id unavailable"} 
        result = CapController.find_users_cap(user)
        if result:
            return {"message": "this user already have a cap friend"}, 405
        cap = CapModel(dados)
        main_queries.save_query(cap)
        return {"message": "the cap has been created"}, 201

    def find_cap(id):
        try:
            cap = main_queries.find_query(CapModel, id)
            return {"id": cap.id, "skin": cap.selected_skin, "name": cap.name}, 200

        except Exception as ex:
            return {"message": ex}

    def update_cap(id, dados):
        try:
            cap = main_queries.find_query(CapModel, id)
            cap.name = dados.get("name", cap.name)
            cap.selected_skin = dados.get("selected_skin", cap.selected_skin)
            cap.excluido = dados.get("excluido", cap.excluido)
            main_queries.save_query(cap)

            main_queries.close_conection()

            return {"message": "Cap updated successfully"}, 200

        except Exception as error:
            return {"message": error}, 400
