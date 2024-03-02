from sql_alchemy import banco
from utils import main_queries, jwt_methods
from models.Users_model import UsersModel
from utils.format_date import format_to_string


class UsersController():

    def find_all_users():
        users = main_queries.find_all_query(UsersModel)
        user_list = []
        for user in users:
            user_list.append({
                "name": user.name,
                "id": user.id,
                "email": user.email,
                "surname": user.surname,
                "capCoins": user.capCoins,
                "dataCadastro": format_to_string(user.dataCadastro),
                "age": format_to_string(user.age),
                "excluido": user.excluido,
            })
        main_queries.close_conection()
        return {"users": user_list}, 200

    def update_user(user_id, dados):
        try:
            user = main_queries.find_query(UsersModel, user_id)
            user.name = dados.get("name", user.name)
            user.surname = dados.get("surname", user.surname)
            user.password = dados.get("password", user.password)
            user.age = dados.get("age", user.age)
            #adaptar user.age para pegar a data de nascimento
            user.capCoins = dados.get("capCoins", user.capCoins)
            user.excluido = dados.get("excluido", user.excluido)
            user.dataAlteracao = banco.func.now()
            main_queries.save_query(user)
            return {"message": "user updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
        
    def find_user(id):
        try:
            user = main_queries.find_query(UsersModel, id)
            return {
                "name": user.name,
                "id": user.id,
                "email": user.email,
                "surname": user.surname,
                "capCoins": user.capCoins,
                "dataCadastro": format_to_string(user.dataCadastro),
                "age": format_to_string(user.age),
                "excluido": user.excluido
            }, 200
        except Exception as ex:
            return {"message": "Not found"}
        

    def verify_login(login):
        login_surname = login.surname
        login_password = login.password
        user = (
            banco.session.query(UsersModel)
            .filter(UsersModel.surname == login.surname)
            .first()
        )
        if user.password == login_password and user.surname == login_surname:
            token = jwt_methods.jwt_create_token(login.surname)
            main_queries.save_query(user)
            return {"message": "user logged in successfully", "token": token}, 200
        return {"message": "login not found: wrong password or surname"}, 404