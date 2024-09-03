from utils import main_queries
from sql_alchemy import banco
from models.Conquistas_model import ConquistasModel


class ConquistaController:
    def find_all_conquistas():
        conquistas = main_queries.find_all_query(ConquistasModel)
        conquista_list = []
        for conquista in conquistas:
            conquista_list.append({
                "id": conquista.id,
                "nome": conquista.id,
                "recompensa": conquista.price,
                "descricao": conquista.active,
                "tipo": conquista.enum,
                "finalizacao": conquista.type
            })
        main_queries.close_conection()
        return {"conquistas": conquista_list}, 200

    def find_conquista(id):
        try:
            conquista = main_queries.find_query(ConquistasModel, id)
            return {
                "id": conquista.id,
                "nome": conquista.id,
                "recompensa": conquista.price,
                "descricao": conquista.active,
                "tipo": conquista.enum,
                "finalizacao": conquista.type
            }, 200
        except Exception as ex:
            return {"message": ex}
