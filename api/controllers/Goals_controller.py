from sql_alchemy import banco
from utils.format_date import format_to_string, format_datetime
from utils import main_queries
from models.Types_model import TypesModel
from models.Goals_model import GoalsModel
from models.Users_model import UsersModel
from controllers.Users_controller import UsersController
from datetime import datetime, timedelta


class GoalsController:

    def find_all_goals():
        goals = main_queries.find_all_query(GoalsModel)
        goal_list = []
        for goal in goals:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            type_name = GoalsController.find_type_name(goal)
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

        main_queries.close_conection()
        return {"goals": goal_list}, 200

    def find_goal(id):
        try:
            goal = main_queries.find_query(GoalsModel, id)
            type_name = GoalsController.find_type_name(goal)
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
            if "expected_data" in dados.keys():
                data_atual = datetime.now()
                data_final = data_atual + timedelta(days=dados["expected_data"])
                goal.expected_data = data_final
            else:
                goal.expected_data = None
            main_queries.save_query(goal)
            return {"message": "Goal updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400

    def post_goal(dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        if not user:
            return {"message": "user id unavailable"}

        goal = GoalsModel(dados)
        goal.initial_data = (
            format_datetime(goal.initial_data)
            if "initial_data" in dados.keys()
            else None
        )
        goal.end_date = (
            format_datetime(goal.end_date) if "end_date" in dados.keys() else None
        )
        goal.expected_data = (
            format_datetime(goal.expected_data)
            if "expected_data" in dados.keys()
            else None
        )
        goal.importance_degree = dados.get("importance_degree", 1)
        goal.user_id = user_id
        main_queries.save_query(goal)
        return {"message": "the goal has been created"}, 201

    def goals_by_user(self, user_id):
        try:
            user = UsersController.find_user(user_id)
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
            type_name = GoalsController.find_type_name(goal)

            goal_object = {
                "goals_id": goal.goals_id,
                "name": goal.name,
                "current_progress": goal.current_progress,
                "importance_degree": goal.importance_degree,
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

    def find_type_name(goal):
        if goal.type_id:
            type_name = main_queries.find_query(TypesModel, goal.type_id).name
        else:
            type_name = "tipo não declarado"
        return type_name
