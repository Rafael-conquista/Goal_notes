from sql_alchemy import banco
from sqlalchemy import ForeignKey


class ConquistaByUserModel(banco.Model):
    __tablename__ = "ConquistasByUser"

    id = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    id_conquista = banco.Column(
        banco.Integer, ForeignKey("Conquistas.id"), unique=False
    )
    id_user = banco.Column(
        banco.Integer, ForeignKey("Users.id"), unique=False
    )
    data_cadastro = banco.Column(banco.DateTime, default=banco.func.now())
    data_alteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    progresso = banco.Column(banco.Integer, default=0)
    data_finalizada = banco.Column(banco.DateTime)