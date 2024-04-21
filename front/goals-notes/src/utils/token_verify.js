import { token_verify } from '../services/api_requests.js';

export function token_storage(token){
    localStorage.setItem("token", token);
}

export function remove_token(){
    localStorage.removeItem("token");
    window.location.href = `/`;
}

export async function verify(token){
    try {
        const response = await token_verify(token)
        const id = response.id
        console.log(id)
        if (!id) {
        window.location.href = `/`;
        }
    } catch {
        console.log('validation error')
    }
}