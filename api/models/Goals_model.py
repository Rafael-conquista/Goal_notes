from sql_alchemy import banco
from sqlalchemy import ForeignKey
from utils.format_date import format_to_string, format_datetime
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

    def __init__(self, dados):
        self.id = random.randint(1, 5000)
        # modificar para verificar se o id sorteado já existe
        self.name = dados["name"] if "name" in dados.keys() else None
        self.obs = dados["obs"] if "obs" in dados.keys() else None
        self.importance_degree = dados["importance_degree"] if "importance_degree" in dados.keys() else None
        self.current_progress = dados["current_progress"] if "current_progress" in dados.keys() else False
        self.initial_data = dados["initial_data"] if "initial_data" in dados.keys() else None
        self.end_date = dados["end_date"] if "end_date" in dados.keys() else None
        self.expected_data = dados["expected_data"] if "expected_data" in dados.keys() else None
        self.user_id = dados["user_id"] if "user_id" in dados.keys() else None

    def save_goal(self):
        banco.session.add(self)
        banco.session.commit()
        banco.session.close()

    @classmethod
    def find_all_goals(cls):
        goals = banco.session.query(GoalsModel).all()
        goal_list = []
        for goal in goals:
            #if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            id = goal.goals_id
            name = goal.name
            goal_list.append({"name": name, "id": id})

        return {"goals": goal_list}, 200
    
    def find_goal(cls, id):
        goal = banco.session.query(GoalsModel).filter(GoalsModel.goals_id == id).first()
        return {
            "id": goal.goals_id, 
            "name": goal.name,
            "importance_degree": goal.importance_degree,
            "initial_data": format_to_string(goal.initial_data),
            "expected_data": format_to_string(goal.expected_data),
            "current_progress": goal.current_progress,
            "obs": goal.obs,
            "end_date": format_to_string(goal.end_date),
            "user_id": goal.user_id
        }, 200
    
    def update_goal(cls, goals_id, dados):
        try:
            goal = (
                banco.session.query(GoalsModel).filter(GoalsModel.goals_id == goals_id).first()
            )
            goal.name = dados["name"] if "name" in dados.keys() else goal.name
            goal.importance_degree = dados["importance_degree"] if "importance_degree" in dados.keys() else goal.importance_degree
            goal.current_progress = dados["current_progress"] if "current_progress" in dados.keys() else goal.current_progress
            goal.obs = dados["obs"] if "obs" in dados.keys() else goal.obs
            goal.initial_data = format_datetime(dados["initial_data"]) if 'initial_data' in dados.keys() else None
            goal.end_date = format_datetime(dados["end_date"]) if 'end_date' in dados.keys() else None
            goal.expected_data = format_datetime(dados["expected_data"]) if 'expected_data' in dados.keys() else None
            GoalsModel.save_goal(goal)
            return {"message": "user updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
