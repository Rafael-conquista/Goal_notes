from datetime import date
from flask_restful import Resource
from flask import request
from models.Goals_model import GoalsModel

class Goal(Resource):
    def get(self, goal_id):
        goal = GoalsModel.find_goal(self, goal_id)
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
        # para tratar datas, vai ser necessário realizar uma verificação para deixar o formato como o abaixo
        #goal.initial_data = date(2023,2,13)
        import ipdb; ipdb.set_trace()
        GoalsModel.save_goal(goal)
        return {"message": "the goal has been created"}, 201