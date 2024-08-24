from sql_alchemy import banco
from flask_restful import Resource
from models.reviews_model import ReviewModel
from utils import main_queries
from flask import request

class review_register(Resource):
    def post(self):
        try:
            dados = request.get_json()
            review = ReviewModel(dados)
            main_queries.save_query(review)
            return {"message": "the review has been created"}, 201
        except:
            return {"message": "that was not possible to add this review"}
