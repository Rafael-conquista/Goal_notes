from sql_alchemy import banco
from sqlalchemy import ForeignKey


class CapModel(banco.Model):
    __tablename__ = "Cap"

    id = banco.Column(banco.Integer, primary_key=True, autoincrement=True)
    name = banco.Column(banco.String(100), nullable=False)
    id_user = banco.Column(banco.Integer, ForeignKey("Users.id"), nullable=False)
    selected_skin = banco.Column(banco.Integer, default=1)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.name = dados.get("name", None)
        self.id_user = dados.get("id_user", None)
