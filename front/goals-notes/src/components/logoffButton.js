import { remove_token } from "../utils/token_verify";

function LogoffButton() {
  return (
    <li className="menu_item_nav">
    <a className="menu_link center" onClick={remove_token} style={{ backgroundColor: "transparent" }}>
      <div className="item_deslogar">
        <a className="menu_link btn_navbar_deslogar">
        deslogar
        </a>
      </div>
    </a>
    </li>
  );
}

export default LogoffButton;
