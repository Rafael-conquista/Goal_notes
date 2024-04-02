import './Style/userStyle.css'
import cap_default from '../images/cap_default.jpg';

function UserUpdateComponent(){
    //preciso adicionar uma estilização minimamente decente para a tela
    //preciso adicionar a lógica e as requisições para realizar a alteração de usuario
    return(
        <div className="user_container">
            <div>
                <h3>Voltar para tela anterior(botão)</h3>
            </div>
            <div>
                <h3>Editar</h3>
            </div>
            <div>
                <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                <input type='text' placeholder='seu apelido'/>
            </div>
            <div>
                <input type='text' placeholder='seu email'/>
            </div>
            <div>
                <input type="password" placeholder='password' required="required"/>
                <input type="password" placeholder='confirm password' required="required"/>
            </div>
            <div className='submit_buttons'>
                <span>
                    Descartar
                </span>
                <div className='submit_comment_button'>
                    Publicar
                </div>
                <div className='submit_comment_button'>
                    Excluir Perfil
                </div>
            </div>
        </div>
    )
}

export default UserUpdateComponent