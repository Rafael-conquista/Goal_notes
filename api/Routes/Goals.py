from datetime import date
from flask_restful import Resource
from flask import request

from models.Goals_model import GoalsModel
from controllers.Goals_controller import GoalsController
from controllers.Items_controller import ItemsController
from models.Users_model import UsersModel
from utils.format_date import format_datetime
from utils import main_queries
from sql_alchemy import banco


class Goals_by_user(Resource):
    def get(self, user_id):
        status_search = request.args.get('ativas')
        return GoalsController.goals_by_user(self, user_id, status_search)


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
        if dados.get('end_date') == True:
            ItemsController.update_all_goals_items(goals_id)
        message = GoalsController.update_goal(goals_id, dados)
        return message
    
    def delete(self, goals_id):
        ItemsController.delete_all_goals_items(goals_id)
        main_queries.delete_query(GoalsModel, goals_id)
        return {"message": "the goal has been deleted"}, 202

    def post(self, goals_id):
        dados = request.get_json()
        user_id = dados["user_id"]

        return GoalsController.post_goal(dados, user_id)
