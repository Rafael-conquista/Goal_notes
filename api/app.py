from Routes.Users import User, Users, User_register, User_login
from Routes.Goals import Goal, Goals, Goals_by_user
from Routes.Types import Type, Types, Type_register
from Routes.Items import Item, Items, Item_register
from Routes.Amigos import Amigo, Amigos, Amigos_registro, Amigo_desfazer
from Routes.Posts import Post, Posts, PostCreator
from Routes.PostComments import PostComment, Comment, Comments
from Routes.VerifyJWT import VerifyJWT
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///banco.db"
cors = CORS(app)
app.config["CORS_HEADERS"] = "*"
api = Api(app)


@app.before_first_request
def cria_banco():
    banco.create_all()


# Users related Routes
api.add_resource(Users, "/users")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(User_register, "/register")
api.add_resource(User_login, "/login")
# users and Goals related Routes
api.add_resource(Goals_by_user, "/usergoals/<int:user_id>")
# Goals related Routes
api.add_resource(Goals, "/goals")
api.add_resource(Goal, "/goal/<int:goals_id>")
# types related Routes
api.add_resource(Types, "/types")
api.add_resource(Type, "/type/<int:id>")
api.add_resource(Type_register, "/type_register")
# Items related Routes
api.add_resource(Items, "/items")
api.add_resource(Item, "/item/<int:id>")
api.add_resource(Item_register, "/item_register")
# Amigos related Routes
api.add_resource(Amigos_registro, "/Amigos_registro")
api.add_resource(Amigos, "/Amigos")
api.add_resource(Amigo, "/Amigo")
api.add_resource(Amigo_desfazer, "/Amigo_desfazer")
# verify JWT token
api.add_resource(VerifyJWT, "/verify_token")
# posts related Routes
api.add_resource(Posts, "/posts")
api.add_resource(Post, "/post/<int:id>")
api.add_resource(PostCreator, "/create_post")
# comm related Routes
api.add_resource(Comments, "/comments")
api.add_resource(Comment, "/comment/<int:id>")
api.add_resource(PostComment, "/post_comment")

if __name__ == "__main__":
    from sql_alchemy import banco

    banco.init_app(app)
    app.run(host="0.0.0.0", port=5000, debug=True)
