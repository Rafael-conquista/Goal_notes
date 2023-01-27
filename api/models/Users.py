from sql_alchemy import banco

class UsersModel(banco.Model):
    __tablename__ = 'users'

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100))
    birthday = banco.column(banco.Date())
    surname = banco.column(banco.String(50))
    password = banco.column(banco.String(25))

    def __init__(self, name, id):
        self.name = name
        self.id = id

    def json(self):
        return {
            "id": self.user_id,
            "name": self.login,
            "birthday": self.birthday,
            "surname": self.surname,
            "password": self.password
        }