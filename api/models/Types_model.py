from sql_alchemy import banco
from sqlalchemy import ForeignKey


class TypesModel(banco.Model):
    __tablename__ = "Types"

    id = banco.Column(banco.Integer, primary_key=True)
    name = banco.Column(banco.String(100), nullable=False)
    obs = banco.Column(banco.String(200))

    def __init__(self, dados):
        # self.id = random.randint(1, 5000)
        self.name = dados["name"] if "name" in dados.keys() else None
        self.obs = dados["obs"] if "obs" in dados.keys() else None

    def save_type(self):
        banco.session.add(self)
        banco.session.commit()
        banco.session.close()

    @classmethod
    def find_all_types(cls):
        types = banco.session.query(TypesModel).all()
        type_list = []
        for type in types:
            # if you need to take a look at the sqlAlchemy object fields --> goal.__dict__
            id = type.id
            name = type.name
            obs = type.obs
            type_list.append({"name": name, "id": id, "obs": obs})

        return {"types": type_list}, 200

    def find_type(cls, id):
        type = banco.session.query(TypesModel).filter(TypesModel.id == id).first()
        return {
            "id": type.id,
            "name": type.name,
            "obs": type.obs,
        }, 200

    def update_type(cls, id, dados):
        try:
            type = banco.session.query(TypesModel).filter(TypesModel.id == id).first()
            type.name = dados.get("name", type.name)
            type.obs = dados.get("obs", type.obs)
            TypesModel.save_type(type)
            return {"message": "Type updated successfully"}, 200
        except Exception as error:
            return {"message": error}, 400
        
    def delete_type(self, id):
        banco.session.query(TypesModel).filter(TypesModel.id == id).delete()
        banco.session.commit()
        banco.session.close()
