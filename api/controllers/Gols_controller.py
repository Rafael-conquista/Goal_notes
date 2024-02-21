from sql_alchemy import banco
from utils.format_date import format_to_string, format_datetime
from utils import main_queries
from models.Types_model import TypesModel
from models.Goals_model import GoalsModel
from models.Users_model import UsersModel
import random

class GoalsController():

    def find_all_goals():
        goals = main_queries.find_all_query(GoalsModel)
        goal_list = []
        for goal in goals:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            type_name = GoalsModel.find_type_name(goal)

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

    def find_goal(id):
        try:
            goal = main_queries.find_query(GoalsModel, id)
            type_name = GoalsModel.find_type_name(goal)
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
    
    def update_goal(goals_id, dados):
        try:
            goal = main_queries.find_query(GoalsModel, goals_id)
            goal.name = dados.get("name", goal.name)
            goal.importance_degree = dados.get(
                "importance_degree", goal.importance_degree
            )
            goal.current_progress = dados.get(
                "current_progress", goal.current_progress)
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
        
    def post_goal(dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        if not user:
            return {
                "message": "user id unavailable"
            }

        goal = GoalsModel(dados)
        goal.initial_data = (
            format_datetime(goal.initial_data)
            if "initial_data" in dados.keys()
            else None
        )
        goal.end_date = (
            format_datetime(
                goal.end_date) if "end_date" in dados.keys() else None
        )
        goal.expected_data = (
            format_datetime(goal.expected_data)
            if "expected_data" in dados.keys()
            else None
        )
        if goal.importance_degree > 5:
            return {"message": "the importance degree must be less than 5"}, 500
        if goal.current_progress < 0 or goal.current_progress > 100:
            return {"message": "the progress is not correct"}, 500
        main_queries.save_query(goal)
        return {"message": "the goal has been created"}, 201
    
    def goals_by_user(self, user_id):
        try:
            user = UsersModel.find_user(self, user_id)
            id = user[0].get("id")
            if id:
                goals = (
                    banco.session.query(GoalsModel)
                    .filter(GoalsModel.user_id == id)
                    .all()
                )
                goals_formatted = GoalsController.parser_goals_infos(goals)
                return goals_formatted
            else:
                return {"message": "the user doesn't exist in database"}, 400

        except:
            return {"message": "something went wrong during request"}, 400
        
    def parser_goals_infos(goals):
        organized_goals = {}
        cont = 0
        for goal in goals:
            type_name = GoalsModel.find_type_name(goal)

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