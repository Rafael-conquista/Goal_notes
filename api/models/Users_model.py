import random
from sql_alchemy import banco
from sqlalchemy.ext.declarative import declarative_base

class UsersModel(banco.Model):
    __tablename__ = 'Users'

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100))
    surname = banco.column(banco.String(50))
    password = banco.column(banco.String(25))

    def __init__(self, dados):
        self.id = random.randint(1,5000)
        #modificar para verificar se o id sorteado já existe 
        self.name = dados['name']
        self.surname = dados['surname']
        self.password = dados['password']
    
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
            "password": self.password
        }