from sql_alchemy import banco
from sqlalchemy import ForeignKey


class StoreUsersModel(banco.Model):
    __tablename__ = "StoreUsers"

    id = banco.Column(banco.Integer, primary_key=True, unique=True) #index
    id_usuario = banco.Column(
        banco.Integer, ForeignKey("Users.id"), unique=False
    )
    id_store = banco.Column(
        banco.Integer, ForeignKey("Store.id"), unique=False
    )
    using = banco.Column(banco.Boolean, default=False) 
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    active = banco.Column(banco.Boolean, default=False) 
    enum = banco.Column(banco.Integer, default=None)
    type = banco.Column(banco.Integer, default=None)
