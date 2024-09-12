from flask_restful import Resource
from controllers.user_infos import UserInfosController
from utils import main_queries


class UserInfos(Resource):
    def get(self, id):
        infos = UserInfosController.get_user_infos(id)
        main_queries.close_conection()
        return infos