import { IoIosHome, IoIosList, IoIosPerson } from 'react-icons/io';
import { IoPeople } from 'react-icons/io5';

const routes = []

//UserTypes:
// alumno
// docente

routes.push({
    to: '/home',
    text: 'Inicio',
    icon: <IoIosHome />, 
    userType: ['alumno', 'docente']
    // onClick: onClick
})

routes.push({
    to: '/encuestas',
    text: 'Encuestas',
    icon: <IoIosList />,
    userType: ['alumno']
    // onClick: onClick
})

// routes.push({
//     to: '/datos',
//     text: 'Datos Personales',
//     icon: <IoIosPerson />,
//     userType: ['alumnos']
//     // onClick: onClick
// })

routes.push({
    to: '/grupos',
    text: 'Grupos',
    icon: <IoPeople />,
    userType: ['docente']
    // onClick: onClick
})

// routes.push({
//     to: '/',
//     text: 'Cerrar Sesion',
//     icon: <IoIosLogOut />,
//     onClick: onClick
// })

export default routes