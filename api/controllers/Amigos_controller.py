from utils import main_queries
from sql_alchemy import banco
from models.Amigos_model import AmigosModel
from models.Users_model import UsersModel
from sqlalchemy import func


class AmigosController:
    def make_friend(self, user_id, user_friend_id):
        if user_id == user_friend_id:
            return {"message": "Impossível fazer amizade com você mesmo"}, 400

        user = main_queries.find_query(UsersModel, user_id)
        user_friend = main_queries.find_query(UsersModel, user_friend_id)

        if not user or not user_friend:
            return {"message": "Usuário não encontrado"}, 400

        existing_amigo = (
            banco.session.query(AmigosModel)
            .filter_by(
                id_usuario_enviado=user_id,
                id_usuario_recebido=user_friend_id,
                excluido=False,
            )
            .first()
        )
        existing_amigo_2 = (
            banco.session.query(AmigosModel)
            .filter_by(
                id_usuario_enviado=user_friend_id,
                id_usuario_recebido=user_id,
                excluido=False,
            )
            .first()
        )
        existing_amigo_deletado = (
            banco.session.query(AmigosModel)
            .filter_by(
                id_usuario_enviado=user_id,
                id_usuario_recebido=user_friend_id,
                excluido=True,
            )
            .first()
        )
        existing_amigo_2_deletado = (
            banco.session.query(AmigosModel)
            .filter_by(
                id_usuario_enviado=user_friend_id,
                id_usuario_recebido=user_id,
                excluido=True,
            )
            .first()
        )

        if existing_amigo or existing_amigo_2:
            return {"message": "A amizade já existe"}, 400

        elif existing_amigo_deletado or existing_amigo_2_deletado:
            amigo = existing_amigo_deletado
            amigo2 = existing_amigo_2_deletado
            if amigo:
                amigo.excluido = False
                amigo.data_solicitacao_aceita = None
                amigo.data_solicitacao = banco.func.now()
                main_queries.save_query(amigo)
                main_queries.close_conection()
                return {"message": "Solicitação enviada"}, 200
            elif amigo2:
                amigo2.id_usuario_enviado = user_id
                amigo2.id_usuario_recebido = user_friend_id
                amigo2.data_solicitacao_aceita = None
                amigo2.data_solicitacao = banco.func.now()
                amigo2.excluido = False
                main_queries.save_query(amigo2)
                main_queries.close_conection()
                return {"message": "Solicitação enviada"}, 200

        new_amigo = AmigosModel()
        new_amigo.id_usuario_enviado = user_id
        new_amigo.id_usuario_recebido = user_friend_id
        new_amigo.data_solicitacao = banco.func.now()
        main_queries.save_query(new_amigo)

        return {"message": "Solicitação enviada"}, 201

    def find_all_friend(self):
        amigos = main_queries.find_all_query(AmigosModel)
        amigos_list = []
        for amigo in amigos:
            amigo_data_cadastro = (
                amigo.data_cadastro.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_cadastro is not None
                else None
            )
            amigo_data_alteracao = (
                amigo.data_alteracao.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_alteracao is not None
                else None
            )
            amigos_list.append(
                {
                    "id": amigo.id,
                    "id_usuario_enviado": amigo.id_usuario_enviado,
                    "id_usuario_recebido": amigo.id_usuario_recebido,
                    "data_cadastro": amigo_data_cadastro,
                    "data_alteracao": amigo_data_alteracao,
                    "excluido": amigo.excluido,
                }
            )

        main_queries.close_conection()
        return {"amigos": amigos_list}, 200


    def find_friend(id_usuario_enviado, id_usuario_recebido):
        amigos = main_queries.find_all_query(AmigosModel)
        amigos_list = []

        for amigo in amigos:
            amigo_data_cadastro = (
                amigo.data_cadastro.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_cadastro is not None
                else None
            )
            amigo_data_alteracao = (
                amigo.data_alteracao.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_alteracao is not None
                else None
            )
            if id_usuario_enviado != "" and id_usuario_recebido == "":
                if amigo.id_usuario_enviado == int(id_usuario_enviado):
                    amigos_list.append(
                        {
                            "id": amigo.id,
                            "id_usuario_enviado": amigo.id_usuario_enviado,
                            "id_usuario_recebido": amigo.id_usuario_recebido,
                            "data_cadastro": amigo_data_cadastro,
                            "data_alteracao": amigo_data_alteracao,
                            "excluido": amigo.excluido,
                        }
                    )
            elif id_usuario_enviado == "" and id_usuario_recebido != "":
                if amigo.id_usuario_recebido == int(id_usuario_recebido):
                    amigos_list.append(
                        {
                            "id": amigo.id,
                            "id_usuario_enviado": amigo.id_usuario_enviado,
                            "id_usuario_recebido": amigo.id_usuario_recebido,
                            "data_cadastro": amigo_data_cadastro,
                            "data_alteracao": amigo_data_alteracao,
                            "excluido": amigo.excluido,
                        }
                    )
            elif id_usuario_enviado != "" and id_usuario_recebido != "":
                if amigo.id_usuario_recebido == int(
                    id_usuario_recebido
                ) and amigo.id_usuario_enviado == int(id_usuario_enviado):
                    amigos_list.append(
                        {
                            "id": amigo.id,
                            "id_usuario_enviado": amigo.id_usuario_enviado,
                            "id_usuario_recebido": amigo.id_usuario_recebido,
                            "data_cadastro": amigo_data_cadastro,
                            "data_alteracao": amigo_data_alteracao,
                            "excluido": amigo.excluido,
                        }
                    )

        if amigos_list:
            return {"amigos": amigos_list}, 200
        else:
            return {"message": "Amigo não encontrado"}, 404
        
    def make_friend_by_user_list(id_usuario):
        amigos = main_queries.find_all_query(AmigosModel)
        amigos_sorted = sorted(amigos, key=lambda amigo: amigo.data_solicitacao or datetime.min, reverse=True)

        amigos_list = []

        for amigo in amigos_sorted:
            amigo_data_cadastro = (
                amigo.data_cadastro.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_cadastro is not None
                else None
            )
            amigo_data_alteracao = (
                amigo.data_alteracao.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_alteracao is not None
                else None
            )
            if id_usuario != "":
                if ((amigo.id_usuario_enviado == int(id_usuario) or (amigo.id_usuario_recebido == int(id_usuario))) and amigo.excluido != 1 and amigo.data_solicitacao_aceita is not None):
                    if(amigo.id_usuario_enviado != id_usuario):
                        user = main_queries.find_query(UsersModel, amigo.id_usuario_enviado)
                    elif(amigo.id_usuario_recebido != id_usuario):
                        user = main_queries.find_query(UsersModel, amigo.id_usuario_recebido)
                    amigos_list.append(
                        {
                            "id": amigo.id,
                            "id_usuario_enviado": amigo.id_usuario_enviado,
                            "id_usuario_recebido": amigo.id_usuario_recebido,
                            "data_cadastro": amigo_data_cadastro,
                            "data_alteracao": amigo_data_alteracao,
                            "excluido": amigo.excluido,
                            "name": user.surname,
                            "userId": user.id,
                        }
                    )
        return amigos_list

    def find_friend_by_user(id_usuario):
        amigos_list = AmigosController.make_friend_by_user_list(id_usuario)
        if amigos_list:
            return {"amigos": amigos_list}, 200
        else:
            return {"message": "Amigo não encontrado"}, 404

    def find_friend_by_user_pendente(id_usuario):
        amigos = main_queries.find_all_query(AmigosModel)
        amigos_sorted = sorted(amigos, key=lambda amigo: amigo.data_solicitacao or datetime.min, reverse=True)

        amigos_list = []

        for amigo in amigos_sorted:
            amigo_data_cadastro = (
                amigo.data_cadastro.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_cadastro is not None
                else None
            )
            amigo_data_alteracao = (
                amigo.data_alteracao.strftime("%Y-%m-%d %H:%M:%S")
                if amigo.data_alteracao is not None
                else None
            )
            if id_usuario != "":
                if ((amigo.id_usuario_enviado == int(id_usuario) or (amigo.id_usuario_recebido == int(id_usuario))) and amigo.excluido != 1 and amigo.data_solicitacao_aceita is None):
                    if(amigo.id_usuario_enviado != id_usuario):
                        user = main_queries.find_query(UsersModel, amigo.id_usuario_enviado)
                    elif(amigo.id_usuario_recebido != id_usuario):
                        user = main_queries.find_query(UsersModel, amigo.id_usuario_recebido)
                    amigos_list.append(
                        {
                            "id": amigo.id,
                            "id_usuario_enviado": amigo.id_usuario_enviado,
                            "id_usuario_recebido": amigo.id_usuario_recebido,
                            "data_cadastro": amigo_data_cadastro,
                            "data_alteracao": amigo_data_alteracao,
                            "excluido": amigo.excluido,
                            "name": user.surname,
                            "userId": user.id,
                        }
                    )
        if amigos_list:
            return {"amigos": amigos_list}, 200
        else:
            return {"message": "Amigo não encontrado"}, 404

    def update_amigo(dados, id):
        try:
            amigo = main_queries.find_query(AmigosModel, id)
            if amigo:
                amigo.excluido = True
                main_queries.save_query(amigo)
                main_queries.close_conection()
                return {"message": "Amigo atualizado com sucesso"}, 200
            else:
                return {"message": "Amigo não encontrado"}, 404
        except Exception as error:
            return {"message": str(error)}, 400

    def friend_accept_request(id_amizade):
        try:
            amigo = main_queries.find_query(AmigosModel, id_amizade)
            if amigo:
                amigo.data_solicitacao_aceita = banco.func.now()
                main_queries.save_query(amigo)
                main_queries.close_conection()
                return {"message": "Solicitação Aceita"}, 200
            else:
                return {"message": "Amigo não encontrado"}, 404
        except Exception as error:
            return {"message": str(error)}, 400

    def friend_deny_request(id_amizade):
            try:
                amigo = main_queries.find_query(AmigosModel, id_amizade)
                if amigo:
                    amigo.excluido = True
                    main_queries.save_query(amigo)
                    main_queries.close_conection()
                    return {"message": "Solicitação Aceita"}, 200
                else:
                    return {"message": "Amigo não encontrado"}, 404
            except Exception as error:
                return {"message": str(error)}, 400
