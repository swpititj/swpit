
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../hooks/auth';

function ModalExit({ show, setShow,}) {

    const [error, setError] = useState()
    const { logout, setUser, user, URLAPI } = useAuth()

    const onClickLogout = async () => {
        const [isLogout, error] = await logout()
        if (isLogout && !error) {
            setUser(null)
            navigate('/', { state: { isLogout: true } })
        } else {
            alert(error)
        }
        
    }

    useEffect(() => {
        
    }, [])


    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="md" >
               <Modal.Body>
                    <Modal.Title>Deseas Cerrar Sesión?</Modal.Title>
               </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={onClickLogout}>
                        Cerrar Sesion
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { ModalExit };