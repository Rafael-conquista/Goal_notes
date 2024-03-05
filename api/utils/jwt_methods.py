from datetime import timedelta, datetime
import jwt

SECRET_KEY = 'generic-secret-word'

def jwt_create_token(email):
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {'email': email, 'exp': expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def jwt_decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    expiration = datetime.fromtimestamp(payload['exp'])
    email = payload['email']
    time_difference = expiration - datetime.utcnow()
    if time_difference < timedelta(minutes=5) and time_difference.total_seconds() > 0:
        token = jwt_create_token(email)
        return {
            "message": "token expiring, update the session token",
            "token": token, 
            "email":email
        }, 200
    else:
        return {"message": "token lifetime stil valid", "email": email}, 200