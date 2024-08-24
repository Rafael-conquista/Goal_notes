from sql_alchemy import banco
from sqlalchemy import ForeignKey


class ReviewModel(banco.Model):
    __tablename__ = "Reviews"

    id = banco.Column(banco.Integer, primary_key=True, unique=True)
    user_id = banco.Column(banco.Integer, ForeignKey("Users.id"), nullable=False)
    message = banco.Column(banco.String)
    rating = banco.Column(banco.Integer, nullable=False)
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())

    def __init__(self, dados):
        self.message = dados.get("message", None)
        self.user_id = dados.get("user_id", None)
        self.rating = dados.get("rating", None)
