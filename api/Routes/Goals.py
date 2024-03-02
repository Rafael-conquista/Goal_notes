from datetime import date
from flask_restful import Resource
from flask import request

from models.Goals_model import GoalsModel
from controllers.Goals_controller import GoalsController
from models.Users_model import UsersModel
from utils.format_date import format_datetime
from utils import main_queries
from sql_alchemy import banco


class Goals_by_user(Resource):
    def get(self, user_id):
        return GoalsController.goals_by_user(self, user_id)


class Goals(Resource):
    def get(self):
        goals = GoalsController.find_all_goals()
        return goals


class Goal(Resource):
    def get(self, goals_id):
        goal = GoalsController.find_goal(goals_id)
        return goal

    def put(self, goals_id):
        dados = request.get_json()
        message = GoalsController.update_goal(goals_id, dados)
        return message

    def post(self, goals_id):
        dados = request.get_json()
        user_id = dados['user_id']

        return GoalsController.post_goal(dados, user_id)
