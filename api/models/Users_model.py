import random
from sql_alchemy import banco


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

    def save_user(self):
        banco.session.add(self)
        banco.session.commit()
        banco.session.close()

    def find_all_users(cls):
        users = banco.session.query(UsersModel).all()
        user_list = []
        for user in users:
            id = user.id
            name = user.name
            user_list.append({"name": name, "id": id})

        return {"users": user_list}

    def find_user(cls, id):
        user = banco.session.query(UsersModel).filter(UsersModel.id == id).first()
        return {"id": user.id, "name": user.name}

    def verify_login(self, login):
        login_surname = login.surname
        login_password = login.password
        user = (
            banco.session.query(UsersModel)
            .filter(UsersModel.surname == login.surname)
            .first()
        )
        if user.logged:
            return {"message": "user is already logged in"}
        if user.password == login_password and user.surname == login_surname:
            user.logged = True
            UsersModel.save_user(user)
            return {"message": "user logged successfully"}
        return {"message": "login not found: wrong password or surname"}
