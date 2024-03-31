from utils import main_queries
from models.items_model import ItemsModel

class ItemsController():
    # Cria o método de busca por todos os itens.
    def find_all_items():
         # Chama a busca por todos os itens, passando os itens que estão no modelo.
        items = main_queries.find_all_query(ItemsModel)
        # Cria a lista vazia que será mostrada para quem realizar a busca.
        item_list =  []
        # Percorre os tipos existentes.
        for item in items:
            # Grava os valores em variáveis de ambiente.
            id = item.id
            goal_id = item.goal_id
            desc = item.desc
            # Adiciona na lista vazia que será exibida para o usuário.
            item_list.append({"item_id": id, "goal_id": goal_id, "desc": desc})
        # Fecha a conexão com o banco de dados.
        main_queries.close_conection()
        # Retorna os valores para o usuário, junto ao status da busca.
        return {"item": item_list}, 200
    
    # Cria o método de busca por um ID de um item específico.
    def find_item(id):
        # Tenta executar o código abaixo.
        try:
            # Defini a variável passando o modelo dos dados, junto ao ID.
            item = main_queries.find_query(ItemsModel, id)
            # Encontrando valores, eles serão exibidos aqui nesse formato.
            return {
                "id": item.id,
                "goal_id": item.goal_id,
                "desc": item.desc
            }, 200
        # Caso não seja possível realizar essa busca, será exibida a mensagem de que não foi possível.
        except Exception as ex:
            return {"message": ex}
        
        # Irei receber o ID que deverá ser atualizado, e os dados que serão atualizados.
    def update_item(id, dados):
        try:
            # Obtém o item a ser atualizado do banco de dados com base no ID fornecido.
            item = main_queries.find_query(ItemsModel, id)
            # Atualiza o código do item, se um novo valor for fornecido em "dados".
            item.id = dados.get("name", item.id)
            # Atualiza o código das metas do item, se um novo valor for fornecido em "dados".
            item.goal_id = dados.get("goal_id", item.goal_id)
            # Salva as alterações no banco de dados.
            main_queries.save_query(item)
            # Fecha a conexão com o bando de dados.
            main_queries.close_conection()
            # Retorna a mensagem de sucesso para o usuário.
            return {"message": "Item updated successfully"}, 200
        # Caso não seja possível realizar esse update, será exibida a mensagem de que não foi possível.
        except Exception as error:
            return {"message": error}, 400
                