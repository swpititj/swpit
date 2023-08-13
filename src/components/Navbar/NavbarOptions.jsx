import { IoIosHome, IoIosInformationCircle, IoIosList, IoIosPerson } from 'react-icons/io';
import { IoPeople } from 'react-icons/io5';

const routes = []

//UserTypes:
// alumno
// docente
// root

routes.push({
    to: '/home',
    text: 'Inicio',
    icon: <IoIosHome />, 
    userType: ['alumno', 'docente', 'root']
    // onClick: onClick
})

routes.push({
    to: '/encuestas',
    text: 'Encuestas',
    icon: <IoIosList />,
    userType: ['alumno']
    // onClick: onClick
})

routes.push({
    to: '/grupos',
    text: 'Grupos',
    icon: <IoPeople />,
    userType: ['docente']
    // onClick: onClick
})
routes.push({
    to: '/informacion',
    text: 'Informacion',
    icon: <IoIosInformationCircle />,
    userType: ['alumno', 'docente']
    // onClick: onClick
})


export default routes