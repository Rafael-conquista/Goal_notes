from sql_alchemy import banco
from sqlalchemy import ForeignKey


class ConquistasModel(banco.Model):
    __tablename__ = "Conquistas" 

    id = banco.Column(banco.Integer, primary_key=True, unique=True, autoincrement=True)
    nome = banco.Column(banco.String(100), nullable=False)
    recompensa = banco.Column(banco.Integer, nullable=False)
    data_cadastro = banco.Column(banco.DateTime, default=banco.func.now())
    data_alteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    descricao = banco.Column(banco.String(200))
    tipo = banco.Column(banco.String(50), nullable=False)
    finalizacao = banco.Column(banco.Integer, nullable=False)