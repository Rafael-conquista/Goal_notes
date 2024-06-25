from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "*"

if os.getenv('USE_SQLITE') == 'True':
    print('Utilizando banco de dados local com SQLite')
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///banco.db"
else:
    print('Utilizando banco de dados local com Docker e PostgreSQL, certifique de estar rodando o container corretamente')
    server = os.getenv('SQL_SERVER', 'db')
    database = os.getenv('SQL_DATABASE', 'my_database')
    username = os.getenv('SQL_USER', 'postgres')
    password = os.getenv('SQL_PASSWORD', '')
    port = os.getenv('SQL_PORT', '5432')
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:example@db:5432/postgres"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

banco = SQLAlchemy(app)
api = Api(app)

# Import your routes here
from Routes.Users import User, Users, User_register, User_login
from Routes.Goals import Goal, Goals, Goals_by_user
from Routes.Types import Type, Types, Type_register
from Routes.Items import Item, Items, Item_register, ItemsByGoals
from Routes.Amigos import Amigo, Amigos, Amigos_registro, Amigo_desfazer, Amigos_user
from Routes.Posts import Post, Posts, PostCreator
from Routes.PostComments import PostComment, Comment, Comments
from Routes.Caps import Cap_register, Cap, Users_cap
from Routes.Store import Store_skins, Store, Store_register
from Routes.VerifyJWT import VerifyJWT

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
api.add_resource(ItemsByGoals, "/items_by_goal/<int:id>")
# Amigos related Routes
api.add_resource(Amigos_registro, "/Amigos_registro")
api.add_resource(Amigos, "/Amigos")
api.add_resource(Amigo, "/Amigo")
api.add_resource(Amigos_user, "/AmigosUser/<int:user_id>")
api.add_resource(Amigo_desfazer, "/Amigo_desfazer")
# verify JWT token
api.add_resource(VerifyJWT, "/verify_token")
# posts related Routes
api.add_resource(Posts, "/posts")
api.add_resource(Post, "/post/<int:id>")
api.add_resource(PostCreator, "/create_post")
# comments related Routes
api.add_resource(Comments, "/comments")
api.add_resource(Comment, "/comment/<int:id>")
api.add_resource(PostComment, "/post_comment")
#caps related Routes
api.add_resource(Cap, "/cap/<int:id>")
api.add_resource(Cap_register, "/cap_register")
api.add_resource(Users_cap, "/users_cap/<int:id>")
#Store related Routes
api.add_resource(Store_skins,"/skins")
api.add_resource(Store, "/store/<int:id>")
api.add_resource(Store_register, "/skin_register")

@app.before_first_request
def cria_banco():
    banco.create_all()

if __name__ == "__main__":
    from sql_alchemy import banco

    banco.init_app(app)
    app.run(host="0.0.0.0", port=5000, debug=True)
