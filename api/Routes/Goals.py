from datetime import date
from flask_restful import Resource
from flask import request

from models.Goals_model import GoalsModel
from models.Users_model import UsersModel
from utils.format_date import format_datetime
from utils import main_queries
from sql_alchemy import banco


class Goals_by_user(Resource):
    def get(self, user_id):
        try:
            user = UsersModel.find_user(self, user_id)
            id = user[0].get("id")
            if id:
                goals = (
                    banco.session.query(GoalsModel)
                    .filter(GoalsModel.user_id == id)
                    .all()
                )
                goals_formatted = GoalsModel.parser_goals_infos(self, goals)
                return goals_formatted
            else:
                return {"message": "the user doesn't exist in database"}, 400

        except:
            return {"message": "something went wrong during request"}, 400


class Goals(Resource):
    def get(self):
        goals = GoalsModel.find_all_goals()
        return goals


class Goal(Resource):
    def get(self, goals_id):
        goal = GoalsModel.find_goal(self, goals_id)
        return goal

    def delete(self, user_id):
        GoalsModel.delete_user(self, user_id)

    def put(self, goals_id):
        dados = request.get_json()
        message = GoalsModel.update_goal(self, goals_id, dados)
        return message

    def post(self, goals_id):
        dados = request.get_json()
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
        if goal.importance_degree > 5:
            return {"message": "the importance degree must be less than 5"}, 500
        if goal.current_progress < 0 or goal.current_progress > 100:
            return {"message": "the progress is not correct"}, 500
        main_queries.save_query(goal)
        return {"message": "the goal has been created"}, 201
