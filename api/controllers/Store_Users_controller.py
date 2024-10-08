from utils import main_queries
from sql_alchemy import banco
from models.Store_Users_model import StoreUsersModel
from models.Store_model import StoreModel
from models.Users_model import UsersModel
from utils.format_date import format_to_string, format_datetime


class StoreUsersController:
    def find_itens(idUser):
        skins = main_queries.find_all_query(StoreUsersModel)
        if not isinstance(skins, list):
            skins = [skins]
            
        if skins is None:
            skins = []

        skin_list = []
        for skin in skins:
            if (skin.id_usuario == idUser and skin.active == 1):
                skin_list.append({
                    "id": skin.id,
                    "id_usuario": skin.id_usuario,
                    "id_store": skin.id_store,
                    "using": skin.using,
                    "dataCadastro": format_to_string(skin.dataCadastro),
                    "dataAlteracao": format_to_string(skin.dataAlteracao),
                    "active": skin.active,
                    "enum": skin.enum,
                    "type": skin.type
                })
         
        main_queries.close_conection()
        return {"skins": skin_list}, 200

    def find_itens_active(idUser, type):
        skins = main_queries.find_all_query(StoreUsersModel)
        if not isinstance(skins, list):
            skins = [skins]
            
        if skins is None:
            skins = []
            
        skin_list = []
        for skin in skins:
            if (skin.id_usuario == idUser and skin.active == 1 and skin.using == 1 and skin.type == type):
                skin_list.append({
                    "id": skin.id,
                    "id_usuario": skin.id_usuario,
                    "id_store": skin.id_store,
                    "using": skin.using,
                    "dataCadastro": format_to_string(skin.dataCadastro),
                    "dataAlteracao": format_to_string(skin.dataAlteracao),
                    "active": skin.active,
                    "enum": skin.enum,
                    "type": skin.type
                })
         
        main_queries.close_conection()
        return {"skins": skin_list}, 200

    def iten_create(preco, capcoins, idUsuario, idStore):
        try:
            new_iten = StoreUsersModel()
            store = main_queries.find_query(StoreModel, idStore)
            new_iten.id_usuario = idUsuario
            new_iten.id_store = idStore
            new_iten.using = 0
            new_iten.active = 1
            new_iten.enum = store.enum
            new_iten.type = store.type
            main_queries.save_query(new_iten)
            main_queries.close_conection()
            user = main_queries.find_query(UsersModel, idUsuario)
            user.capcoins = (capcoins - preco)
            main_queries.save_query(user)
            main_queries.close_conection()
            return {"message": "the skin has been created"}, 201
        except Exception as error:
            return {"message": error}, 501

    def active_iten_user(idSkin, validacao, type):
        if (validacao == False):
            valida = False
            skin_user = main_queries.find_query(StoreUsersModel, idSkin)
            idUser = skin_user.id_usuario

            skins = main_queries.find_all_query(StoreUsersModel)
            if not isinstance(skins, list):
                skins = [skins]

            if skins is None:
                skins = []

            for skin in skins:
                if (skin.id_usuario == idUser and skin.id != idSkin and skin.type == type):
                    skin.using = 0
                    main_queries.save_query(skin)
                elif (skin.id_usuario == idUser and skin.id == idSkin and skin.type == type):
                    skin.using = 1
                    main_queries.save_query(skin)
                    valida = True

            if(valida):
                return 'Alterado'
            else:
                return 'Algo deu erro'
        elif (validacao == True):
            valida = False
            idUser = idSkin
            skins = main_queries.find_all_query(StoreUsersModel)
            if not isinstance(skins, list):
                skins = [skins]

            if skins is None:
                skins = []

            for skin in skins:
                if (skin.id_usuario == int(idUser) and skin.type == type):
                    skin.using = 0
                    main_queries.save_query(skin)
                    valida = True

            if(valida):
                return 'Alterado'
            else:
                return 'Algo deu erro'

        
