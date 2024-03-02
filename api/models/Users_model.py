import random
from sql_alchemy import banco
from utils.format_date import format_datetime


class UsersModel(banco.Model):
    __tablename__ = "Users"

    id = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    name = banco.Column(banco.String(100), nullable=False)
    surname = banco.Column(banco.String(50), nullable=False)
    email = banco.Column(banco.String(120), unique=True, nullable=False)
    age = banco.Column(banco.DateTime, nullable=False)
    admin = banco.Column(banco.Boolean, default=False)
    capCoins = banco.Column(banco.Integer, default=0)
    password = banco.Column(banco.String(25), nullable=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)


    def __init__(self, dados):
        self.name = dados.get("name", None)
        self.surname = dados.get("surname", None)
        self.password = dados.get("password", None)
        self.email = dados.get("email", None)
        if dados.get("age", None):
            date = format_datetime(dados.get("age", None))
            self.age = date
