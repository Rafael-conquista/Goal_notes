import { remove_token } from "../utils/token_verify";

function LogoffButton() {
  return (
    <button
      onClick={remove_token}
      className="option"
      style={{ backgroundColor: "transparent" }}
    >
      Deslogar
    </button>
  );
}

export default LogoffButton;
