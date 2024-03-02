from sql_alchemy import banco
from sqlalchemy import ForeignKey
from datetime import datetime, timedelta
from utils.format_date import format_to_string
import random


class GoalsModel(banco.Model):
    __tablename__ = "Goals"

    goals_id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100), nullable=False)
    obs = banco.Column(banco.String(200))
    importance_degree = banco.Column(banco.Integer)
    current_progress = banco.Column(banco.Integer, default=0)
    initial_data = banco.Column(banco.DateTime, default=banco.func.now())
    update_data = banco.Column(banco.DateTime, default=banco.func.now())
    end_date = banco.Column(banco.Date, default=None)
    expected_data = banco.Column(banco.DateTime, default=None)
    dataExcluido = banco.Column(banco.Date, default=None)
    user_id = banco.Column(
        banco.Integer, ForeignKey("Users.id"), nullable=False)
    type_id = banco.Column(banco.Integer, ForeignKey("Types.id"))

    def __init__(self, dados):
        self.id = random.randint(1, 5000)
        # modificar para verificar se o id sorteado já existe
        self.name = dados["name"] if "name" in dados.keys() else None
        self.obs = dados["obs"] if "obs" in dados.keys() else None
        self.importance_degree = (
            dados["importance_degree"] if "importance_degree" in dados.keys() else None
        )
        self.current_progress = (
            dados["current_progress"] if "current_progress" in dados.keys() else False
        )
        self.initial_data = (
            dados["initial_data"] if "initial_data" in dados.keys() else None
        )
        self.end_date = dados["end_date"] if "end_date" in dados.keys(
        ) else None
        self.expected_data = (
            dados["expected_data"] if "expected_data" in dados.keys() else None
        )
        self.user_id = dados["user_id"] if "user_id" in dados.keys() else None
        self.type_id = dados["type_id"] if "type_id" in dados.keys() else None
        if "expected_data" in dados.keys():
            data_atual = datetime.now()
            data_final = data_atual + timedelta(days=dados["expected_data"])
            self.expected_data = format_to_string(data_final)
        else:
            self.expected_data = None
