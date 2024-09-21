from utils import main_queries
from sql_alchemy import banco
from models.Users_model import UsersModel
from models.Goals_model import GoalsModel
from controllers.Goals_controller import GoalsController
from controllers.Amigos_controller import AmigosController
from controllers.Store_Users_controller import StoreUsersController
from datetime import datetime, timedelta

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
        
        total_goals = len(goals_completed_formatted) + len(goals_incomplete_formatted)
        infos.update({"total_goals": total_goals})
        
        last_goals = GoalsController.find_4_last_finished_goals(id)[0]
        infos.update({"last_completed_goals": last_goals})
        
        next_goals = GoalsController.find_4_next_goals_to_finish(id)[0]
        infos.update({"next_goals": next_goals})
        
        total_pomodoros = GoalsController.get_total_pomodoros_by_user(id)
        infos.update({"total_pomodoro": total_pomodoros})
        
        time_pomodoro = total_pomodoros * 25
        infos.update({"time_pomodoro": time_pomodoro})
        
        valuable_goal = GoalsController.get_most_value_goal(id)
        infos.update({"most_valuable_goal": valuable_goal})
        
        amigos = AmigosController.find_friend_by_user(id)
        amigos_len = len(amigos[0].get('amigos', None)) if amigos[1] != 404 else 0
        infos.update({"len_amigos": amigos_len})
        
        amigos = amigos[0].get('amigos', None)
        today = datetime.now()

        date_30_days_ago = today - timedelta(days=30)
        for record in amigos:
            record['data_cadastro'] = datetime.strptime(record['data_cadastro'], '%Y-%m-%d %H:%M:%S')

        last_30_days_records = [record for record in amigos if record['data_cadastro'] >= date_30_days_ago]
        num_last_30_days_records = len(last_30_days_records)
        infos.update({"amigos_mes": num_last_30_days_records})

        for record in amigos:
            record['data_cadastro'] = record['data_cadastro'].strftime('%Y-%m-%d %H:%M:%S')

        oldest_record = min(amigos, key=lambda x: x['data_cadastro'], default=None)
        infos.update({"oldest_amigo": oldest_record})

        newest_record = max(amigos, key=lambda x: x['data_cadastro'], default=None)
        infos.update({"newest_amigo": newest_record})

        total_esteticos = StoreUsersController.find_itens(id)[0].get('skins')
        infos.update({"total_esteticos": len(total_esteticos)})

        count_skins = sum(1 for record in total_esteticos if record['type'] == 1)
        infos.update({"total_skins": count_skins})

        count_backgrounds = sum(1 for record in total_esteticos if record['type'] == 2)
        infos.update({"total_backgrounds": count_backgrounds})
        return infos, 200
