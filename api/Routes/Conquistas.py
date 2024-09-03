from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from controllers.Conquistas_controller import ConquistaController


class Conquistas(Resource):
    def get(self):
        return ConquistaController.find_all_conquistas()


class Conquista(Resource):
    def get(self, id):
        return ConquistaController.find_conquista(id)
