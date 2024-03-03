from sql_alchemy import banco
from sqlalchemy import ForeignKey


class TypesModel(banco.Model):
    __tablename__ = "Types"

    id = banco.Column(banco.Integer, primary_key=True, autoincrement=True)
    numLikes = banco.Column(banco.Integer, default=0)
    desc = banco.Column(banco.String(200))
    id_user = banco.Column(banco.Integer, ForeignKey("Users.id"))
    id_goal = banco.Column(banco.Intefer, ForeignKey("Goals.goals_id"))
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, default=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.name = dados.get("name", None)
        self.obs = dados.get("obs", None)