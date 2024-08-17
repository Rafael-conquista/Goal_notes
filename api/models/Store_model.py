from sql_alchemy import banco
from sqlalchemy import ForeignKey


class StoreModel(banco.Model):
    __tablename__ = "Store"

    id = banco.Column(banco.Integer, primary_key=True, unique=True) #index
    rarity = banco.Column(banco.Integer, default=0)
    price = banco.Column(banco.Integer, nullable=False)
    initial_data = banco.Column(banco.DateTime, nullable=False)
    end_date = banco.Column(banco.DateTime, default=None) #criar trigger
    dataCadastro = banco.Column(banco.DateTime, default=banco.func.now())
    dataAlteracao = banco.Column(banco.DateTime, onupdate=banco.func.now())
    active = banco.Column(banco.Boolean, default=False) 
    enum = banco.Column(banco.Integer)
    type = banco.Column(banco.Integer)

    def __init__(self, dados):
        self.price = dados.get("price", None)
        self.initial_data = dados.get("initial_data", None)
        self.end_date = dados.get("end_date", None)
        self.active = dados.get("active", None)
        self.enum = dados.get("enum", None)
        self.type = dados.get("type", None)
