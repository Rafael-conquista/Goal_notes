import { remove_token } from "../utils/token_verify"

function LogoffButton() {
    return(
        <div onClick={remove_token} className="option">
            Deslogar
        </div>
    )
}

export default LogoffButton