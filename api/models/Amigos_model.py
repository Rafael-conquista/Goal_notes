import random
from sql_alchemy import banco
from sqlalchemy import ForeignKey
from utils import main_queries
import datetime


class AmigosModel(banco.Model):
    __tablename__ = "Amigos"

    id = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    id_usuario_enviado = banco.Column(
        banco.Integer, ForeignKey("Users.id"), unique=False
    )
    id_usuario_recebido = banco.Column(
        banco.Integer, ForeignKey("Users.id"), unique=False
    )
    data_cadastro = banco.Column(banco.DateTime, default=banco.func.now())
    data_alteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)
