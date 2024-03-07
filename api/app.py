from Routes.Users import User, Users, User_register, User_login
from Routes.Goals import Goal, Goals, Goals_by_user
from Routes.Types import Type, Types, Type_register
from Routes.Items import Item, Items, Item_register
from Routes.VerifyJWT import VerifyJWT
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_restful import Api
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///banco.db"
cors = CORS(app)
app.config['CORS_HEADERS'] = '*'
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
#verify JWT token
api.add_resource(VerifyJWT, '/verify_token')

if __name__ == "__main__":
    from sql_alchemy import banco

    banco.init_app(app)
    app.run(host='0.0.0.0', port=5000, debug=True)

