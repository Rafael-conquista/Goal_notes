from sql_alchemy import banco


def save_query(self):
    banco.session.add(self)

def find_query(table, id):
    if table.__tablename__ == "Goals":
        result = banco.session.query(table).filter(
            table.goals_id == id).first()
    else:
        result = banco.session.query(table).filter(table.id == id).first()
    return result


def find_all_query(table):
    result = banco.session.query(table).all()
    return result


def delete_query(table, id):
    if table.__tablename__ == "Goals":
        banco.session.query(table).filter(table.goals_id == id).delete()
    else:
        banco.session.query(table).filter(table.id == id).delete()
    close_conection()


def close_conection():
    banco.session.commit()
    banco.session.close()
