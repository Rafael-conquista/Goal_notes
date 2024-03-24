import CapCreatorComponent from '../../components/CapCreator';
import '../../components/Style/capCreatorStyle.css';

function CapCreate(){
    return(
        <>
            <div className='capScreen'>
                <CapCreatorComponent/>
            </div>
        </>
    )
}

export default CapCreate;