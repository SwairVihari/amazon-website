import React, { useState } from 'react';

import PhoneInput from 'react-phone-number-input';
import { Modal, Button, Alert ,Form } from 'react-bootstrap';
import styles from './PhoneForm.module.css';
import axios from 'axios';
import 'react-phone-number-input/style.css'

const PhoneForm = ({smsId, geoCode, showPhone ,landingPage , buttonText, title}) => {

    const [value, setValue] = useState('')
    const [show, setShow] = useState(showPhone);
    const [phoneError, setPhoneError] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [btnText,setBtnText] = useState(buttonText);
    const [blocked,setBlocked] = useState(false);
    const [clickCount,setClickCount] = useState(0);

    const validateNumber = () => {
     
        if (value.length > 9 && value !== '') {
            setPhoneError(false);
            sendPhone();
        } else {
            setPhoneError(true);
            setMessage('Invalid phone number')
        }
    };

    const sendPhone = () => {
        if(clickCount >1){
            setBlocked(true);           
        }
        setClickCount(clickCount+1);
        axios.post('/api/leads',{
            landingPage,
            phone : value,
            geo  : geoCode,
            smsId : smsId
        })
        .then(response =>{
            console.log('lead r',response.data);
            setSuccess(false);
            setPhoneError(false);

            if(response.data.smsStatus === 'Success'){
                setSuccess(true);
                setMessage('You were sent an sms with details of my program.');        
                // window.gtag('event', 'conversion', {'send_to': 'AW-978161306/Lq_PCI7R_O0BEJqdttID'});    
            }else if(response.data.smsStatus === 'Failed'){
                setPhoneError(true);
                setMessage('Invalid number please try again.');
            }else if(response.data.smsStatus === 'Exists'){
                setPhoneError(true);
                setMessage('You have already recieved the details of my program');
            }
            setBtnText('Didn\'t recieve the sms. Try again.');
       
        })
        .catch(error =>{
          console.log(error);
          setPhoneError(true);
          setMessage('Something went wrong please try again');       
        });
 }; 



    return (
        
        <Modal.Dialog>
            <Modal.Header >
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
         
                <PhoneInput
             
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    defaultCountry={geoCode} />
                {
                    phoneError  ?
                        <Alert variant='danger' className={styles.phoneError}>
                            {message}
                        </Alert> : ''
                }

                {
                    success  ?
                        <Alert variant='success' className={styles.phoneError}>
                            {message}
                        </Alert> : ''
                }
                 
            </Modal.Body>
            <Button variant="primary" disabled={blocked} size="lg" block onClick={() => { validateNumber() }}>{ blocked? 'You have exceeded the limit. Please try again later': btnText}</Button>
            
            <Modal.Footer>            
            </Modal.Footer>
        </Modal.Dialog>


    )
};

export default PhoneForm;