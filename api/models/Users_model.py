import random
from sql_alchemy import banco


class UsersModel(banco.Model):
    __tablename__ = "Users"

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100))
    surname = banco.Column(banco.String(50))
    password = banco.Column(banco.String(25))

    def __init__(self, dados):
        self.id = random.randint(1, 5000)
        # modificar para verificar se o id sorteado já existe
        self.name = dados["name"] if "name" in dados.keys() else None
        self.surname = dados["surname"] if "surname" in dados.keys() else None
        self.password = dados["password"] if "password" in dados.keys() else None

    def save_user(self):
        banco.session.add(self)
        banco.session.commit()
        banco.session.close()

    def json(self):
        return {
            "id": self.user_id,
            "name": self.login,
            "birthday": self.birthday,
            "surname": self.surname,
            "password": self.password,
        }

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
        if user.password == login_password and user.surname == login_surname:
            return True
        return False
