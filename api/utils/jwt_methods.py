from datetime import timedelta, datetime
import jwt

SECRET_KEY = 'generic-secret-word'

def jwt_create_token(username):
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {'username': username, 'exp': expiration}
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def jwt_decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])