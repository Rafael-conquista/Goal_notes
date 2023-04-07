from sql_alchemy import banco
from sqlalchemy import ForeignKey
from utils.format_date import format_to_string, format_datetime
from utils import main_queries
from models.Types_model import TypesModel
import random


class GoalsModel(banco.Model):
    __tablename__ = "Goals"

    goals_id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100), nullable=False)
    obs = banco.Column(banco.String(200))
    importance_degree = banco.Column(banco.Integer)
    current_progress = banco.Column(banco.Float, default=0)
    initial_data = banco.Column(banco.Date)
    end_date = banco.Column(banco.Date)
    expected_data = banco.Column(banco.Date)
    user_id = banco.Column(banco.Integer, ForeignKey("Users.id"), nullable=False)
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
        self.end_date = dados["end_date"] if "end_date" in dados.keys() else None
        self.expected_data = (
            dados["expected_data"] if "expected_data" in dados.keys() else None
        )
        self.user_id = dados["user_id"] if "user_id" in dados.keys() else None
        self.type_id = dados["type_id"] if "type_id" in dados.keys() else None

    @classmethod
    def find_all_goals(cls):
        goals = banco.session.query(GoalsModel).all()
        goal_list = []
        for goal in goals:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            if goal.type_id:
                type_name = main_queries.find_query(TypesModel, goal.type_id).name
            else:
                type_name = "tipo não declarado"

            goal_list.append(
                {
                    "id": goal.goals_id,
                    "name": goal.name,
                    "importance_degree": goal.importance_degree,
                    "initial_data": format_to_string(goal.initial_data),
                    "expected_data": format_to_string(goal.expected_data),
                    "current_progress": goal.current_progress,
                    "obs": goal.obs,
                    "end_date": format_to_string(goal.end_date),
                    "user_id": goal.user_id,
                    "type_name": type_name,
                }
            )

        return {"goals": goal_list}, 200

    def find_goal(cls, id):
        try:
            goal = main_queries.find_query(GoalsModel, id)
            if goal.type_id:
                type_name = main_queries.find_query(TypesModel, goal.type_id).name
            else:
                type_name = "tipo não declarado"
        except Exception as ex:
            return {"message": ex}

        return {
            "id": goal.goals_id,
            "name": goal.name,
            "importance_degree": goal.importance_degree,
            "initial_data": format_to_string(goal.initial_data),
            "expected_data": format_to_string(goal.expected_data),
            "current_progress": goal.current_progress,
            "obs": goal.obs,
            "end_date": format_to_string(goal.end_date),
            "user_id": goal.user_id,
            "type_name": type_name,
        }, 200

    def update_goal(cls, goals_id, dados):
        try:
            goal = main_queries.find_query(GoalsModel, id)
            goal.name = dados.get("name", goal.name)
            goal.importance_degree = dados.get(
                "importance_degree", goal.importance_degree
            )
            goal.current_progress = dados.get("current_progress", goal.current_progress)
            goal.obs = dados.get("obs", goal.obs)
            goal.initial_data = (
                format_datetime(dados["initial_data"])
                if "initial_data" in dados.keys()
                else None
            )
            goal.end_date = (
                format_datetime(dados["end_date"])
                if "end_date" in dados.keys()
                else None
            )
            goal.expected_data = (
                format_datetime(dados["expected_data"])
                if "expected_data" in dados.keys()
                else None
            )
            main_queries.save_query(goal)
            return {"message": "Goal updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400

    def parser_goals_infos(cls, goals):
        organized_goals = {}
        cont = 0
        for goal in goals:
            if goal.type_id:
                type_name = main_queries.find_query(TypesModel, goal.type_id).name
            else:
                type_name = "tipo não declarado"

            goal_object = {
                "goals_id": goal.goals_id,
                "name": goal.name,
                "current_progress": goal.current_progress,
                "end_date": format_to_string(goal.end_date),
                "initial_data": format_to_string(goal.initial_data),
                "expected_data": format_to_string(goal.expected_data),
                "user_id": goal.user_id,
                "obs": goal.obs,
                "type_name": type_name,
            }
            organized_goals.update({cont: goal_object})
            cont = cont + 1

        return organized_goals, 200
    
    #criar um método para verificar se existe um type_id
