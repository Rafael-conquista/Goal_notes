from sql_alchemy import banco
from sqlalchemy import ForeignKey


class PostsCommentsModel(banco.Model):
    __tablename__ = "Comments"

    id = banco.Column(banco.Integer, primary_key=True, autoincrement=True)
    numLikes = banco.Column(banco.Integer, default=0)
    comentario = banco.Column(banco.String(200), nullable=False)
    id_user = banco.Column(banco.Integer, ForeignKey("Users.id"), nullable=False)
    id_post = banco.Column(banco.Integer, ForeignKey("Goals.goals_id"), nullable=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    excluido = banco.Column(banco.Boolean, default=False)

    def __init__(self, dados):
        self.comentario = dados.get("comentario", None)
        self.id_user = dados.get("id_user", None)
        self.id_post = dados.get("id_post", None)
