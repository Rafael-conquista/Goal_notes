from sql_alchemy import banco
from sqlalchemy import text
from utils import main_queries, jwt_methods
from models.Users_model import UsersModel
from utils.format_date import format_to_string
from models.Amigos_model import AmigosModel
import re

class UsersController:

    def find_all_users():
        users = main_queries.find_all_query(UsersModel)
        user_list = []
        for user in users:
            user_list.append(
                {
                    "name": user.name,
                    "id": user.id,
                    "email": user.email,
                    "surname": user.surname,
                    "capcoins": user.capcoins,
                    "dataCadastro": format_to_string(user.dataCadastro),
                    "age": format_to_string(user.age),
                    "excluido": user.excluido,
                }
            )

        return {"users": user_list}, 200

    def find_user_apelido(apelido, id, idUsuario):
        users = main_queries.find_all_query(UsersModel)
        user_list = []

        for user in users:
            if user.id == idUsuario:
                continue
            def check_existing_friendship(user_id, friend_id):
                    existing_amigo = (
                        banco.session.query(AmigosModel)
                        .filter(
                            ((AmigosModel.id_usuario_enviado == user_id) & 
                            (AmigosModel.id_usuario_recebido == friend_id)) |
                            ((AmigosModel.id_usuario_enviado == friend_id) & 
                            (AmigosModel.id_usuario_recebido == user_id))
                        )
                        .filter(AmigosModel.excluido == False)
                        .first()
                    )
                    return existing_amigo is not None
            if check_existing_friendship(idUsuario, user.id):
                continue

            if id == "" and re.search(apelido, user.surname, re.IGNORECASE):
                user_list.append(
                    {
                        "name": user.name,
                        "id": user.id,
                        "email": user.email,
                        "surname": user.surname,
                        "capcoins": user.capcoins,
                        "dataCadastro": format_to_string(user.dataCadastro),
                        "age": format_to_string(user.age),
                        "excluido": user.excluido,
                    }
                )
            elif apelido == "" and str(id) == str(user.id):
                user_list.append(
                    {
                        "name": user.name,
                        "id": user.id,
                        "email": user.email,
                        "surname": user.surname,
                        "capcoins": user.capcoins,
                        "dataCadastro": format_to_string(user.dataCadastro),
                        "age": format_to_string(user.age),
                        "excluido": user.excluido,
                    }
                )
            elif apelido and id and re.search(apelido, user.surname, re.IGNORECASE) and str(id) == str(user.id):
                user_list.append(
                    {
                        "name": user.name,
                        "id": user.id,
                        "email": user.email,
                        "surname": user.surname,
                        "capcoins": user.capcoins,
                        "dataCadastro": format_to_string(user.dataCadastro),
                        "age": format_to_string(user.age),
                        "excluido": user.excluido,
                    }
                )

        user_list = user_list[:6]

        if not user_list:
            return {"message": "Nenhum usuário encontrado"}, 200

        return {"users": user_list}, 200

    def update_user(user_id, dados):
        users = main_queries.find_query(UsersModel, user_id)
        if (dados.get("sensivel") == True and dados.get("password") == users.password and dados.get("email") != users.email and dados.get("newPassword") == ""):
            try:
                user = main_queries.find_query(UsersModel, user_id)
                user.surname = dados.get("surname", user.surname)
                user.email = dados.get("email", user.email)
                # adaptar user.age para pegar a data de nascimento
                user.dataAlteracao = banco.func.now()
                main_queries.save_query(user)
                return {"message": "user updated successfully"}, 200            
            except Exception as error:
                return {"message": error}, 400
        elif (dados.get("sensivel") == True and dados.get("password") == users.password and dados.get("newPassword") != ""):
            try:
                user = main_queries.find_query(UsersModel, user_id)
                user.surname = dados.get("surname", user.surname)
                user.email = dados.get("email", user.email)
                user.password = dados.get("newPassword", user.password)
                user.dataAlteracao = banco.func.now()
                main_queries.save_query(user)
                return {"message": "user updated successfully"}, 200            
            except Exception as error:
                return {"message": error}, 400
        elif (dados.get("sensivel") == False):
            try:
                user = main_queries.find_query(UsersModel, user_id)
                user.surname = dados.get("surname", user.surname)
                user.dataAlteracao = banco.func.now()
                main_queries.save_query(user)
                return {"message": "user updated successfully"}, 200            
            except Exception as error:
                return {"message": error}, 400
        elif (dados.get("sensivel") == True and dados.get("password") != users.password):
            return {"message": "senha inválida"}, 200
        else:
            try:
                user = main_queries.find_query(UsersModel, user_id)
                user.name = dados.get("name", user.name)
                user.surname = dados.get("surname", user.surname)
                user.email = dados.get("email", user.email)
                user.age = dados.get("age", user.age)
                user.admin = dados.get("admin", user.admin)
                user.capcoins += dados.get("capCoins", user.capcoins)
                user.password = dados.get("password", user.password)
                user.dataAlteracao = banco.func.now()
                main_queries.save_query(user)
                return {"message": "user updated successfully"}, 200            
            except Exception as error:
                return {"message": error}, 400
    def find_user(id):
        try:
            user = main_queries.find_query(UsersModel, id)
            return {
                "name": user.name,
                "id": user.id,
                "admin": user.admin,
                "email": user.email,
                "surname": user.surname,
                "capcoins": user.capcoins,
                "dataCadastro": format_to_string(user.dataCadastro),
                "age": format_to_string(user.age),
                "excluido": user.excluido,
            }, 200
        except Exception as ex:
            return {"message": "Not found"}

    def verify_login(login):
        login_email = login.email
        login_password = login.password
        user = (
            banco.session.query(UsersModel)
            .filter(UsersModel.email == login_email)
            .first()
        )
        if user.excluido:
            return {"message": "this user is deleted", "id": user.id}, 200
        elif user.password == login_password and user.email == login_email:
            token = jwt_methods.jwt_create_token(user.id)
            return {"message": "user logged in successfully", "token": token}, 200
        return {"message": "login not found: wrong password or surname"}, 404
    
    def update_user_capcoin(id, new_capcoins):
        user = main_queries.find_query(UsersModel, id)
        user.capcoins += new_capcoins
        main_queries.save_query(user)

    def find_user_conquistas(id):
        result = banco.session.execute(text("SELECT * FROM sp_conquista_por_usuario(:id)"), {"id": id})
        conquistas = result.fetchall()

        conquista_list = []
        for conquista in conquistas:
            conquista_list.append(
                {
                    "id_usuario": int(conquista.id),
                    "id_conquista": int(conquista.id_conquista),
                    "name": conquista.name,
                    "surname": conquista.surname,
                    "email": conquista.email,
                    "nome_conquista": conquista.nome_conquista,
                    "tipo_descrisao": conquista.tipo_descr,
                    "percentual_atual": float(conquista.percentualatual),
                    "data_finalizada": format_to_string(conquista.data_finalizada),
                    "progresso": int(conquista.progresso),
                    "finalizacao": int(conquista.finalizacao),
                    "enum_image": int(conquista.enum),
                }
            )

        return {"conquistas": conquista_list}, 200

    def find_conquistas(id):
        result = banco.session.execute(text("select * from sp_conquistas(:id)"), {"id": id})
        conquistas = result.fetchall()

        conquista_list = []
        for conquista in conquistas:
            conquista_list.append(
                {
                    "id": int(conquista.id_meta),
                    "nome": conquista.nome_meta,
                    "recompensa": int(conquista.recompensa_meta),
                    "data_cadastro": format_to_string(conquista.data_cadastro_meta),
                    "descrisao": conquista.descricao_meta,
                    "tipo": conquista.tipo_meta,
                    "finalizacao": int(conquista.finalizacao_meta),
                    "enum": int(conquista.enum_meta),
                    "id_user": conquista.id_user,
                    "finalizada": conquista.finalizada,
                }
            )

        return {"conquistas": conquista_list}, 200


