from sql_alchemy import banco
from sqlalchemy import ForeignKey


class TypesModel(banco.Model):
    __tablename__ = "Types"

    id = banco.Column(banco.Integer, primary_key=True, autoincrement=True)
    name = banco.Column(banco.String(100), nullable=False)
    obs = banco.Column(banco.String(200))
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.name = dados.get("name", None)
        self.obs = dados.get("obs", None)
