from datetime import timedelta, datetime
import jwt

SECRET_KEY = 'generic-secret-word'

def jwt_create_token(username):
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {'username': username, 'exp': expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def jwt_decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    expiration = datetime.fromtimestamp(payload['exp'])
    username = payload['username']
    time_difference = expiration - datetime.utcnow()
    import ipdb; ipdb.set_trace()
    if time_difference < timedelta(minutes=5) and time_difference.total_seconds() > 0:
        token = jwt_create_token(username)
        return {
            "message": "token expiring, update the session token",
            "token": token, 
            "username":username
        }, 200
    else:
        return {"message": "token lifetime stil valid", "username": username}, 200