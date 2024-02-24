from datetime import timedelta, datetime
import jwt

SECRET_KEY = 'generic-secret-word'

def jwt_create_token(username):
    expiration = datetime.utcnow() + timedelta(minutes=1)
    payload = {'username': username, 'exp': expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def jwt_decode_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])