from Routes.Users import User, Users, User_register, User_login, User_logoff
from Routes.Goals import Goal
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

import json, jsonify

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///banco.db"
api = Api(app)

@app.before_first_request
def cria_banco():
    banco.create_all()

api.add_resource(Users, "/users")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(User_register, "/register")
api.add_resource(User_login, "/login")
api.add_resource(User_logoff, "/logoff")

api.add_resource(Goal, "/goal")

if __name__ == "__main__":
    from sql_alchemy import banco
    banco.init_app(app)
    app.run(debug=True)
