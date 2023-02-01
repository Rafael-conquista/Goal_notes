from Routes.Users import Users, User_register
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
api = Api(app)
banco = SQLAlchemy(app)

@app.before_first_request
def create_database():
    banco.create_all()

api.add_resource(Users, "/users")
api.add_resource(User_register, "/register")

if __name__ == "__main__":
    from sql_alchemy import banco
    banco.init_app(app)
    app.run(debug=True)