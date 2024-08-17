from sql_alchemy import banco
from utils.format_date import format_to_string, format_datetime
from utils import main_queries
from models.Types_model import TypesModel
from models.Goals_model import GoalsModel
from models.Users_model import UsersModel
from models.Cap_model import CapModel
from controllers.Users_controller import UsersController
from controllers.Posts_controller import PostsController
from datetime import datetime, timedelta
from sqlalchemy import func


class GoalsController:

    def format_goals_json(goals):
        goal_list = []
        for goal in goals:
            goal_list.append(
                {
                    "name": goal.name,
                    "expected_data": format_to_string(goal.expected_data),
                    "obs": goal.obs,
                    "end_date": format_to_string(goal.end_date),

                }
            )
        return goal_list


    def find_4_last_finished_goals(user_id):
        today = datetime.now().date()
        if banco.engine.dialect.name == 'postgresql':
            goals = banco.session.query(GoalsModel)\
                .filter(GoalsModel.end_date <= today, GoalsModel.user_id == user_id)\
                .order_by(func.abs(func.date_part('epoch', GoalsModel.end_date) - func.date_part('epoch', today)))\
                .limit(4).all()
        else:
            goals = banco.session.query(GoalsModel)\
                .filter(GoalsModel.end_date <= today, GoalsModel.user_id == user_id)\
                .order_by(func.abs(func.julianday(GoalsModel.end_date) - func.julianday(today)))\
                .limit(4).all()
        goals_list = GoalsController.format_goals_json(goals)
        return {"goals": goals_list}, 200
    
    def find_4_next_goals_to_finish(user_id): 
        today = datetime.now()
        goals = banco.session.query(GoalsModel)\
            .filter(GoalsModel.expected_data > today, GoalsModel.user_id == user_id, GoalsModel.end_date == None)\
            .order_by(GoalsModel.expected_data)\
            .limit(4)\
            .all()
        goals_list = GoalsController.format_goals_json(goals)
        return {"goals": goals_list}, 200 

    def find_all_goals():
        goals = main_queries.find_all_query(GoalsModel)
        goal_list = []
        for goal in goals:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            type_name = GoalsController.find_type_name(goal)
            goal_list.append(
                {
                    "id": goal.goals_id,
                    "name": goal.name,
                    "importance_degree": goal.importance_degree,
                    "initial_data": format_to_string(goal.initial_data),
                    "expected_data": format_to_string(goal.expected_data),
                    "current_progress": goal.current_progress,
                    "pomodoro_cycles": goal.pomodoro_cycles,
                    "goal_value": goal.goal_value,
                    "obs": goal.obs,
                    "end_date": format_to_string(goal.end_date),
                    "user_id": goal.user_id,
                    "type_name": type_name,
                }
            )

        main_queries.close_conection()
        return {"goals": goal_list}, 200

    def find_goal(id):
        try:
            goal = main_queries.find_query(GoalsModel, id)
            type_name = GoalsController.find_type_name(goal)
        except Exception as ex:
            return {"message": ex}

        return {
            "id": goal.goals_id,
            "name": goal.name,
            "importance_degree": goal.importance_degree,
            "initial_data": format_to_string(goal.initial_data),
            "expected_data": format_to_string(goal.expected_data),
            "current_progress": goal.current_progress,
            "pomodoro_cycles": goal.pomodoro_cycles,
            "goal_value": goal.goal_value,
            "obs": goal.obs,
            "end_date": format_to_string(goal.end_date),
            "user_id": goal.user_id,
            "type_name": type_name,
        }, 200

    def update_goal(goals_id, dados):
        try:
            goal = main_queries.find_query(GoalsModel, goals_id)
            goal.name = dados.get("name", goal.name)
            if dados.get("type_id") != None:
                goal.type_id = dados.get("type_id", goal.type_id)
            if dados.get("importance_degree") != None:
                goal.importance_degree = dados.get(
                    "importance_degree", goal.importance_degree
                )
            goal.current_progress = dados.get("current_progress", goal.current_progress)
            goal.obs = dados.get("obs", goal.obs)
            if dados.get("end_date") != None:
                if dados.get("end_date") == False:
                    goal.end_date = None
                else:
                    goal.end_date = datetime.now()
                    if goal.end_date < goal.expected_data:
                        goal.goal_value = goal.goal_value + 5
                if goal.goal_value != -1:
                    UsersController.update_user_capcoin(goal.user_id, goal.goal_value)
                #adicionar a moeda para o usuário antes de desativar as moedas
                #create posts
                cap = banco.session.query(CapModel).filter(CapModel.id_user == goal.user_id).first()
                data = {
                    "desc": goal.name,
                    "id_user": goal.user_id,
                    "id_goal": goal.goals_id,
                    "image_id": cap.selected_skin
                }
                PostsController.make_post(data, goal.user_id)

                goal.goal_value = -1
            if dados.get('expected_data'):
                data_atual = datetime.now()
                data_final = data_atual + timedelta(days=dados["expected_data"])
                goal.expected_data = data_final
            if dados.get('pomodoro_cycles'):
                goal.pomodoro_cycles = goal.pomodoro_cycles + int(dados.get('pomodoro_cycles'))
                if goal.goal_value != -1 and goal.goal_value < 15:
                    goal.goal_value = goal.goal_value + int(dados.get('pomodoro_cycles'))
            main_queries.save_query(goal)
            return {"message": "Goal updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400

    def post_goal(dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        if not user:
            return {"message": "user id unavailable"}

        goal = GoalsModel(dados)
        goal.initial_data = (
            format_datetime(goal.initial_data)
            if "initial_data" in dados.keys()
            else None
        )
        goal.end_date = (
            format_datetime(goal.end_date) if "end_date" in dados.keys() else None
        )
        goal.expected_data = (
            format_datetime(goal.expected_data)
            if "expected_data" in dados.keys()
            else None
        )
        goal.importance_degree = dados.get("importance_degree", 1)
        goal.user_id = user_id
        main_queries.save_query(goal)
        return {"id": goal.goals_id, "message": "the goal has been created"}, 201

    def goals_by_user(self, user_id, status=True):
        try:
            user = UsersController.find_user(user_id)
            id = user[0].get("id")
            if id:
                goals = (
                    banco.session.query(GoalsModel)
                    .filter(GoalsModel.user_id == id)
                    .all()
                )
                goals_formatted = GoalsController.parser_goals_infos(goals, status)
                return goals_formatted
            else:
                return {"message": "the user doesn't exist in database"}, 400

        except:
            return {"message": "something went wrong during request"}, 400

    def parser_goals_infos(goals, status):
        organized_goals = {}
        cont = 0
        for goal in goals:
            type_name = GoalsController.find_type_name(goal)
            if status == 'true':
                if not goal.end_date:
                    goal_object = {
                        "goals_id": goal.goals_id,
                        "name": goal.name,
                        "current_progress": goal.current_progress,
                        "importance_degree": goal.importance_degree,
                        "pomodoro_cycles": goal.pomodoro_cycles,
                        "goal_value": goal.goal_value,
                        "end_date": format_to_string(goal.end_date),
                        "initial_data": format_to_string(goal.initial_data),
                        "expected_data": format_to_string(goal.expected_data),
                        "user_id": goal.user_id,
                        "obs": goal.obs,
                        "type_name": type_name,
                    }
                    organized_goals.update({cont: goal_object})
                cont = cont + 1
            else:
                if goal.end_date:
                    goal_object = {
                        "goals_id": goal.goals_id,
                        "name": goal.name,
                        "current_progress": goal.current_progress,
                        "importance_degree": goal.importance_degree,
                        "pomodoro_cycles": goal.pomodoro_cycles,
                        "goal_value": goal.goal_value,
                        "end_date": format_to_string(goal.end_date),
                        "initial_data": format_to_string(goal.initial_data),
                        "expected_data": format_to_string(goal.expected_data),
                        "user_id": goal.user_id,
                        "obs": goal.obs,
                        "type_name": type_name,
                    }
                    organized_goals.update({cont: goal_object})
                cont = cont + 1


        return organized_goals, 200

    def find_type_name(goal):
        if goal.type_id:
            type_name = main_queries.find_query(TypesModel, goal.type_id).name
        else:
            type_name = "tipo não declarado"
        return type_name