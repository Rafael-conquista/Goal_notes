from utils import main_queries
from sql_alchemy import banco
from models.Posts_model import PostsModel
from models.Users_model import UsersModel
from models.Goals_model import GoalsModel
from controllers.Amigos_controller import AmigosController
from datetime import datetime, timedelta

class PostsController:
    def make_post(dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        goal = main_queries.find_query(GoalsModel, dados.get("id_goal", None))
        if not user or not goal:
            return False
        if goal.user_id == user_id:
            post = PostsModel(dados)
            post.user_id = user_id
            post.goal_id = dados.get("goal_id", None)
            post.image_id = dados.get("image_id", None)
            main_queries.save_query(post)
            return True
        return False

    def find_post(id):
        try:
            post = main_queries.find_query(PostsModel, id)
            post_json = {
                "desc": post.desc,
                "id_goal": post.id_goal,
                "id": post.id,
                "id_user": post.id_user,
                "id_image": post.image_id,
                "numLikes": post.numLikes,
            }
            return post_json, 200
        except Exception as e:
            return {"message": e}

    def find_all_posts():
        posts = main_queries.find_all_query(PostsModel)
        post_list = []
        for post in posts:
            # if you need to take a look at the sqlAlchemy object fields --> post.__dict__

            post_list.append(
                {
                    "desc": post.desc,
                    "id_goal": post.id_goal,
                    "id": post.id,
                    "id_user": post.id_user,
                    "id_image": post.image_id,
                    "numLikes": post.numLikes,
                }
            )
        main_queries.close_conection()
        return {"posts": post_list}, 200

    def update_post(id, dados):
        try:
            post = main_queries.find_query(PostsModel, id)
            post.desc = dados.get("desc", post.desc)
            post.numLikes = dados.get("numLikes", post.numLikes)
            post.excluido = dados.get("excluido", post.excluido)
            post.dataAlteracao = banco.func.now()
            main_queries.save_query(post)
            main_queries.close_conection()
            return {"message": "post updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
        
    def object_to_dict(obj):
        result = {}
        for column in obj.__table__.columns:
            value = getattr(obj, column.name)
            if isinstance(value, datetime):
                result[column.name] = value.isoformat()
            else:
                result[column.name] = value
        return result

    def set_post_json_config(amigos, user_id):
        post_json = []
        data_atual = datetime.now()
        limite_data = data_atual - timedelta(days=5)
        if not amigos:
            return []
        
        for amigo in amigos: 
            if amigo.get("id_usuario_enviado") == user_id:
                result = banco.session.query(PostsModel).filter(PostsModel.id_user == amigo["id_usuario_recebido"]).all()
                id_friend = amigo["id_usuario_recebido"]
            else:
                result = banco.session.query(PostsModel).filter(PostsModel.id_user == amigo["id_usuario_enviado"]).all()
                id_friend = amigo["id_usuario_enviado"]
            
            for post in result:
                if post.dataCadastro > limite_data:
                    post_dict = PostsController.object_to_dict(post)
                    user = main_queries.find_query(UsersModel, id_friend)
                    post_dict.update({"user_name": user.surname})
                    post_json.append(post_dict)
        
        return post_json

    def show_friend_posts(user_id):
        amigos = AmigosController.make_friend_by_user_list(user_id)
        posts = PostsController.set_post_json_config(amigos, user_id)
        return {"posts": posts}, 200