from utils import main_queries
from sql_alchemy import banco
from models.Posts_model import PostsModel
from models.Users_model import UsersModel
from models.Goals_model import GoalsModel

class PostsController():
    def make_post(dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        goal = main_queries.find_query(
            GoalsModel, dados.get('id_goal', None)
        )
        if not user or not goal:
            return {
                "message": "incorret user or goal id"
            }

        post = PostsModel(dados)
        post.user_id = user_id
        post.goal_id = dados.get('goal_id', None)
        main_queries.save_query(post)
        
        return {"message": "the post has been created"}, 201
    
    def find_post(id):
        try:
            post = main_queries.find_query(PostsModel, id)
            post_json = {
                "desc": post.desc,
                "id_goal": post.id_goal,
                "id": post.id,
                "id_user": post.id_user,
                "numLikes": post.numLikes
            }
            return post_json, 200
        except Exception as e:
            return{"message": e}
        
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
                    "numLikes": post.numLikes
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