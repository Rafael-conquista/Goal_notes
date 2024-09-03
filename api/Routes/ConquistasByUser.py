from sql_alchemy import banco
from flask_restful import Resource
from flask import request
from controllers.ConquistasUser_controller import ConquistaByUserController


class ConquistasByUser(Resource):
    def get(self, id):
        return ConquistaByUserController.find_all_conquistas(id)
