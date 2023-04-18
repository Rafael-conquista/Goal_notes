import random
from sql_alchemy import banco
from utils import main_queries


class UsersModel(banco.Model):
    __tablename__ = "Users"

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100), nullable=False)
    surname = banco.Column(banco.String(50), nullable=False)
    password = banco.Column(banco.String(25), nullable=False)
    logged = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.id = random.randint(1, 5000)
        # modificar para verificar se o id sorteado já existe
        self.name = dados["name"] if "name" in dados.keys() else None
        self.surname = dados["surname"] if "surname" in dados.keys() else None
        self.password = dados["password"] if "password" in dados.keys() else None
        self.logged = dados["logged"] if "logged" in dados.keys() else False

    def delete_user(self, user_id):
        banco.session.query(UsersModel).filter(UsersModel.id == user_id).delete()
        banco.session.commit()
        banco.session.close()

    def update_user(self, user_id, dados):
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

    @classmethod
    def find_all_users(cls):
        users = main_queries.find_all_query(UsersModel)
        user_list = []
        for user in users:
            id = user.id
            name = user.name
            user_list.append({"name": name, "id": id})

        return {"users": user_list}, 200

    def find_user(cls, id):
        try:
            user = main_queries.find_query(UsersModel, id)
            return {"id": user.id, "name": user.name}, 200
        except Exception as ex:
            return {"message": ex}

    def verify_login(self, login):
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

    def verify_logoff(self, logoff):
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
