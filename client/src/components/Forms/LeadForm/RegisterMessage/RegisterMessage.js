import React, { useState } from 'react'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import styles from './RegisterMessage.module.css'

const RegisterMessage = props => {
    const handleClose = () => {
        props.modalclose()
    }
    return (
     
            
               
                      
                    <Modal   className={styles.modalMessage}  show={props.show}  >
                        <Modal.Header >
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{props.message}</Modal.Body>
                        <Modal.Footer>
                          
                            <Button variant="primary" onClick={handleClose}>
                               OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                
                   
    )

}

export default RegisterMessage