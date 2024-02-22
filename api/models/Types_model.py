from sql_alchemy import banco
from sqlalchemy import ForeignKey
from utils import main_queries


class TypesModel(banco.Model):
    __tablename__ = "Types"

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100), nullable=False)
    obs = banco.Column(banco.String(200))

    def __init__(self, dados):
        # self.id = random.randint(1, 5000)
        self.name = dados["name"] if "name" in dados.keys() else None
        self.obs = dados["obs"] if "obs" in dados.keys() else None
