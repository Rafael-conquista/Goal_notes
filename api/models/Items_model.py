from sql_alchemy import banco
from sqlalchemy import ForeignKey

class ItemsModel(banco.Model):
    __tablename__ = "Items"

    items_id = banco.Column(banco.Integer, primary_key=True)
    descricao = banco.Column(banco.String(100), nullable=False)
    ativo = banco.Column(banco.Boolean, default=True)
    goals_id = banco.Column(banco.Integer, ForeignKey("Goals.goals_id"), nullable=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.descricao = dados.get("descricao", None)
        self.ativo = dados.get("ativo", True)
        self.codMeta = dados.get("codMeta", None)
        self.dataCadastro = dados.get("dataCadastro", None)
        self.dataAlteracao = dados.get("dataAlteracao", None)
        self.excluido = dados.get("excluido", False)