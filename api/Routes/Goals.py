from datetime import date
from flask_restful import Resource
from flask import request

from models.Goals_model import GoalsModel
from utils.format_date import format_datetime

class Goal(Resource):
    def get(self, id):
        goal = GoalsModel.find_goal(self, id)
        return goal

    def delete(self, user_id):
        GoalsModel.delete_user(self, user_id)

    def put(self, goals_id):
        dados = request.get_json()
        message = GoalsModel.update_user(self, goals_id, dados)
        return message

    def post(self):
        dados = request.get_json()
        goal = GoalsModel(dados)
        goal.initial_data = format_datetime(goal.initial_data) if 'initial_data' in dados.keys() else None
        goal.end_date = format_datetime(goal.end_date) if 'end_date' in dados.keys() else None
        goal.expected_data = format_datetime(goal.expected_data) if 'expected_data' in dados.keys() else None
        if goal.importance_degree > 5:
            return {"message": "the importance degree must be less than 5"}, 500
        if goal.current_progress < 0 or goal.current_progress > 100:
            return{"message": "the progress is not correct"}, 500
        GoalsModel.save_goal(goal)
        return {"message": "the goal has been created"}, 201
    
#class Goals_by_user(Resource):
#    def get(self, user_id):
        #encontrar se o user existe na base
        #filtrar os goals que sejam relacionados a ele
        #organizar o retorno e refatorar todas as datas
        #adicionar a rota ao App.py
