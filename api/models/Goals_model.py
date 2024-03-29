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
    importance_degree = banco.Column(banco.Integer, default=1)
    current_progress = banco.Column(banco.Integer, default=0)
    initial_data = banco.Column(banco.DateTime, default=banco.func.now())
    update_data = banco.Column(banco.DateTime, onupdate=banco.func.now())
    end_date = banco.Column(banco.Date, default=None)
    expected_data = banco.Column(banco.DateTime, default=None)
    dataExcluido = banco.Column(banco.Date, default=None)
    user_id = banco.Column(banco.Integer, ForeignKey("Users.id"), nullable=False)
    type_id = banco.Column(banco.Integer, ForeignKey("Types.id"))

    def __init__(self, dados):
        self.name = dados.get("name", None)
        self.name = dados.get("obs", None)
        self.name = dados.get("importance_degree", 1)
        self.name = dados.get("current_progress", None)
        self.name = dados.get("initial_data", None)
        self.name = dados.get("end_date", None)
        self.name = dados.get("expected_data", None)
        self.name = dados.get("user_id", None)
        self.name = dados.get("type_id", None)
        if "expected_data" in dados.keys():
            data_atual = datetime.now()
            data_final = data_atual + timedelta(days=dados["expected_data"])
            self.expected_data = format_to_string(data_final)
        else:
            self.expected_data = None
