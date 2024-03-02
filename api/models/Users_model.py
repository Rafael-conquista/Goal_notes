import random
from sql_alchemy import banco
from utils import main_queries


class UsersModel(banco.Model):
    __tablename__ = "Users"

    id = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    name = banco.Column(banco.String(100), nullable=False)
    surname = banco.Column(banco.String(50), nullable=False)
    email = banco.Column(banco.String(120), unique=True, nullable=False)
    age = banco.Column(banco.Integer, nullable=False)
    admin = banco.Column(banco.Boolean, default=False)
    codCapivara = banco.Column(banco.Integer, unique=True, autoincrement=True)
    capCoins = banco.Column(banco.Integer, default=0)
    password = banco.Column(banco.String(25), nullable=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)


    def __init__(self, dados):
        self.name = dados["name"] if "name" in dados.keys() else None
        self.surname = dados["surname"] if "surname" in dados.keys() else None
        self.password = dados["password"] if "password" in dados.keys() else None
        self.email = dados["email"] if "email" in dados.keys() else None
        self.age = dados["age"] if "age" in dados.keys() else None
        self.codCapivara = dados["codCapivara"] if "codCapivara" in dados.keys() else None
