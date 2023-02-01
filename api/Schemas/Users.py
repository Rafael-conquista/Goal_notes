from models import Users
from app import ma


class UsersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
