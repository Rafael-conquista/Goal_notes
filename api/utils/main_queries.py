from sql_alchemy import banco


def save_query(self):
    banco.session.add(self)
    banco.session.commit()
    banco.session.close()


def find_query(table, id):
    if table.__tablename__ == "Goals":
        result = banco.session.query(table).filter(table.goals_id == id).first()
        return result
    result = banco.session.query(table).filter(table.id == id).first()
    return result


def find_all_query(table):
    result = banco.session.query(table).all()
    return result

#delete