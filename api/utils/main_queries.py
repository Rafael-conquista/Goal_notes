from sql_alchemy import banco

def save_query(self):
    banco.session.add(self)
    banco.session.commit()
    banco.session.close()

