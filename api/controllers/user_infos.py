from utils import main_queries
from sql_alchemy import banco
from models.Users_model import UsersModel
from models.Goals_model import GoalsModel
from controllers.Goals_controller import GoalsController
from controllers.Amigos_controller import AmigosController
from controllers.Store_Users_controller import StoreUsersController

class UserInfosController:

    def get_user_infos(id):
        infos = {}
        users = main_queries.find_query(id=id, table=UsersModel)
        if not users:
            return {"message": "usuário não encontrado"}, 200
        goals = (
            banco.session.query(GoalsModel)
            .filter(GoalsModel.user_id == id)
            .all()
        )
        goals_incomplete_formatted = GoalsController.parser_goals_infos(goals, False)[0]
        infos.update({"incompleted_goals": goals_incomplete_formatted})
        goals_completed_formatted = GoalsController.parser_goals_infos(goals, 'true')[0]
        infos.update({"completed_goals": goals_completed_formatted})
        last_goals = GoalsController.find_4_last_finished_goals(id)[0]
        infos.update({"last_completed_goals": last_goals})
        next_goals = GoalsController.find_4_next_goals_to_finish(id)[0]
        infos.update({"next_goals": next_goals})
        total_pomodoros = GoalsController.get_total_pomodoros_by_user(id)
        infos.update({"total_pomodoro": total_pomodoros})
        valuable_goal = GoalsController.get_most_value_goal(id)
        infos.update({"most_valuable_goal": valuable_goal})
        amigos = AmigosController.find_friend_by_user(id)
        amigos_len = len(amigos[0].get('amigos', None)) if amigos[1] != 404 else 0
        infos.update({"len_amigos": amigos_len})
        total_skins = StoreUsersController.find_itens(id)[0].get('skins')
        infos.update({"total_skins": len(total_skins)})
        return infos, 200