from sql_alchemy import banco
from utils import main_queries
from models.Users_model import UsersModel


class UsersController():

    def find_all_users():
        users = main_queries.find_all_query(UsersModel)
        user_list = []
        for user in users:
            id = user.id
            name = user.name
            user_list.append({"name": name, "id": id})
        main_queries.close_conection()
        return {"users": user_list}, 200

    def update_user(user_id, dados):
        try:
            user = main_queries.find_query(UsersModel, user_id)
            user.name = dados["name"] if "name" in dados.keys() else user.name
            user.surname = (
                dados["surname"] if "surname" in dados.keys() else user.surname
            )
            user.password = (
                dados["password"] if "password" in dados.keys() else user.password
            )
            main_queries.save_query(user)
            return {"message": "user updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
        
    def find_user(id):
        try:
            user = main_queries.find_query(UsersModel, id)
            return {"id": user.id, "name": user.name}, 200
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
        if user.logged:
            return {"message": "user is already logged in"}, 400
        if user.password == login_password and user.surname == login_surname:
            user.logged = True
            main_queries.save_query(user)
            return {"message": "user logged in successfully"}, 200
        return {"message": "login not found: wrong password or surname"}, 404
    
    def verify_logoff(logoff):
        logoff_surname = logoff.surname
        user = (
            banco.session.query(UsersModel)
            .filter(UsersModel.surname == logoff.surname)
            .first()
        )
        if user.logged == False:
            return {"message": "user is already logged out"}, 400
        if user.surname == logoff.surname:
            user.logged = False
            main_queries.save_query(user)
            return {"message": "user logged out successfully"}, 200
        return {"message": "error unlocked, please report us"}