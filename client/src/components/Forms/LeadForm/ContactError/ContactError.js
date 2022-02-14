  
import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from '../ContactError/ContactError.module.css';

const ContactError = ({ message }) => {
  return <div  className={styles.Message}>

    <Alert variant='danger'>
      {message}
    </Alert>
  </div>
};

export default ContactError;