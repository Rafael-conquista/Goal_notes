from utils import main_queries
from sql_alchemy import banco
from models.Conquistas_by_user_model import ConquistaByUserModel
from utils.format_date import format_to_string, format_datetime


class ConquistaByUserController:
    def find_all_conquistas(id):
        #quando tivermos as procs, corrigir para pegar apenas do usuário atual
        conquistas = main_queries.find_all_query(ConquistaByUserModel)
        conquista_list = []
        for conquista in conquistas:
            conquista_list.append({
                "id": conquista.id,
                "nome": conquista.id,
                "recompensa": conquista.recompensa,
                "descricao": conquista.descricao,
                "tipo": conquista.tipo,
                "finalizacao": format_to_string(conquista.finalizacao)
            })
        main_queries.close_conection()
        return {"conquistas": conquista_list}, 200
