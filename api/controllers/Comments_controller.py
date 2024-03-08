from utils import main_queries
from sql_alchemy import banco
from models.PostComments_model import PostsCommentsModel
from models.Users_model import UsersModel
from models.Goals_model import GoalsModel

class CommentsController():
    def make_comment(self, dados, user_id):
        user = main_queries.find_query(UsersModel, user_id)
        post = main_queries.find_query(
            GoalsModel, dados.get('id', None)
        )
        if not user or not post:
            return {
                "message": "incorret user or goal id"
            }

        comments = PostsCommentsModel(dados)
        comments.user_id = user_id
        comments.id_post = dados.get('id_post', None)
        main_queries.save_query(comments)
        
        return {"message": "the comments has been created"}, 201
    
    def find_all_comments(self):
        comments = main_queries.find_all_query(PostsCommentsModel)
        comments_list = []
        for comment in comments:
            # if you need to take a look at the sqlAlchemy object fields --> post.__dict__
            comments_list.append(
                {
                    "comentario": comment.comentario,
                    "id_post": comment.id_post,
                    "id_user": comment.id_user,
                    "numLikes": comment.numLikes
                }
            )

        main_queries.close_conection()
        return {"comments": comments_list}, 200
    
    def find_comment(id):
        try:
            comment = main_queries.find_query(PostsCommentsModel, id)
            import ipdb; ipdb.set_trace()
            post_json = {
                "comentario": comment.comentario,
                "id_post": comment.id_post,
                "id_user": comment.id_user,
                "numLikes": comment.numLikes
            }
            return post_json, 200
        except Exception as e:
            return{"message": e}
        
    def update_comment(id, dados):
        try:
            comment = main_queries.find_query(CommentsController, id)
            import ipdb; ipdb.set_trace()
            comment.comentario = dados.get("comentario", comment.comentario)
            comment.numLikes = dados.get("numLikes", comment.numLikes)
            comment.excluido = dados.get("excluido", comment.excluido)
            comment.dataAlteracao = banco.func.now()
            main_queries.save_query(comment)
            main_queries.close_conection()
            return {"message": "comment updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400