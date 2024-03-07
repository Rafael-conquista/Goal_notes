from sql_alchemy import banco
from sqlalchemy import ForeignKey
from utils import main_queries


class ItemsModel(banco.Model):
    __tablename__ = "Items"

    cod = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    goal_id = banco.Column(banco.Integer, ForeignKey("Goals.goals_id"))
    desc = banco.Column(banco.String(250), nullable=False)
    ativo = banco.Column(banco.Boolean, default=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.desc = dados.get("desc", None)