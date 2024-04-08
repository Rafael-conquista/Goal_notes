import './Style/userStyle.css'
import { FaAngleLeft } from "react-icons/fa6";
import cap_default from '../images/cap_default.jpg';

function UserUpdateComponent(){
    //preciso adicionar a lógica e as requisições para realizar a alteração de usuario
    return(
        <div className="user_container">
            <div className='return_button'>
                <FaAngleLeft/>
            </div>
            <div className='info_input'>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <input type='text' placeholder='seu apelido' className='nickname_input'/>
                <input type='text' placeholder='seu email' className='email_input'/>
                <input type="password" placeholder='password' required="required" className='password_input'/>
                <input type="password" placeholder='confirm password' required="required" className='password_input'/>
            </div>
            <div className='submit_buttons'>
                <div className='submit_comment_button'>
                    Excluir Perfil
                </div>
                <div className='submit_comment_button'>
                    Publicar
                </div>
            </div>
        </div>
    )
}

export default UserUpdateComponent