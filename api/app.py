from Routes.Users import Users, User_register
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
api = Api(app)
db = SQLAlchemy(app)

@app.before_first_request
def create_database():
    db.create_all()

api.add_resource(Users, "/users")
api.add_resource(User_register, "/User_register")

if __name__ == "__main__":
    from sql_alchemy import banco
    banco.init_app(app)
    app.run(debug=True)