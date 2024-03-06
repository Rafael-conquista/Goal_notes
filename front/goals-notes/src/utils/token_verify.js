export function token_storage(token){
    localStorage.setItem("token", token);
}

export function remove_token(){
    localStorage.removeItem("token");
}