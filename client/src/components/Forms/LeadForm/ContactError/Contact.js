import React, { useState } from 'react';
import axios from 'axios';
import ContactError from './ContactError/ContactError.js';
import { Container, Form, Button , Row, Col, Alert} from 'react-bootstrap';

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [sentMessage, setSentMessage] = useState(false);
   

    const errorsObject = {
        firstName: {
            message: "First name required",
            hasError: false
        },
        lastName: {
            message: "Last name is required",
            hasError: false
        },
        email: {
            message: "Valid email address is required",
            hasError: false
        },
        phone: {
            message: "Valid phone number is required",
            hasError: false
        },
        message: {
            message: "Message is required",
            hasError: false
        }

    };

    const [errors, setErrors] = useState(errorsObject)

    const handleSubmit = (event) => {
        event.preventDefault();
        checkErrors();
        if (firstName !== '' &&
            lastName !== '' &&
            email !== '' &&
            phone !== '' &&
            message !== '') {
                setSentMessage(true)
            // const contact = {
            //     lastName: lastName,
            //     firstName: firstName,
            //     email: email,
            //     phone: phone,
            //     message: message
            // };

            // axios.post('/api/contact', contact)
            //     .then(response => {
            //         console.log(response);
            //         setSentMessage(response.data.sent);
            //     }).catch((error) => {
            //         console.log(error);
            //     });

        }
    };


    const checkErrors = () => {
        const newErrors = { ...errors };
        firstName === '' ? newErrors.firstName.hasError = true : newErrors.firstName.hasError = false;
        lastName === '' ? newErrors.lastName.hasError = true : newErrors.lastName.hasError = false;
        email === '' ? newErrors.email.hasError = true : newErrors.email.hasError = false;
        phone === '' ? newErrors.phone.hasError = true : newErrors.phone.hasError = false;
        message === '' ? newErrors.message.hasError = true : newErrors.message.hasError = false;

        setErrors(newErrors);
    };

    const onValueChange = (event) => {

        switch (event.target.id) {
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case 'lastName':
                setLastName(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;

            case 'phone':
                setPhone(event.target.value);
                break;

            case 'message':
                setMessage(event.target.value);
                break;

            default: break;
        }
    };
    return (
        <Container className="py-3" spacing={2} justify="center">
            <h3>
            Contact Us - Get in Touch with Us
            </h3>
            <p>
            Drop us a message or give us a good old-fashioned call.
            We’re ready to turn your idea into something epic.
            </p>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e) => onValueChange(e)} />
                    {
                        errors.firstName.hasError ? <ContactError message={errors.firstName.message} /> : ''
                    }
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label >Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e) => onValueChange(e)} />
                    {
                        errors.lastName.hasError ? <ContactError message={errors.lastName.message} /> : ''
                    }
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => onValueChange(e)} />
                    {
                        errors.email.hasError ? <ContactError message={errors.email.message} /> : ''
                    }
                </Form.Group>
                <Form.Group controlId='phone'>
                    <Form.Label>Phone number </Form.Label>

                    <Form.Control type="tel" placeholder="Phone number" value={phone} onChange={(e) => onValueChange(e)} />


                    {
                        errors.phone.hasError ? <ContactError message={errors.phone.message} /> : ''
                    }
                </Form.Group>
                {/* <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">
          <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
          </select>
      </InputGroup.Text>
    </InputGroup.Prepend>
    <Form.Control type="tel" placeholder="Phone number" value={phone} onChange={(e) => onValueChange(e)} />
                   
                 
  </InputGroup> */}
                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(e) => onValueChange(e)} />
                    {
                        errors.message.hasError ? <ContactError message={errors.message.message} /> : ''
                    }
                </Form.Group>

                { !sentMessage ?
              <Button variant="primary" type="submit">
                     Contact us
               </Button> :''
              }
            </Form>
            { sentMessage ?
                <Row styles={{padding:'10px'}}>
                <Col>
                    <Alert variant='success' >
                        Thank you for contact us. We will be in touch within 24 hours
                    </Alert>
                </Col>
            </Row> :''
           }
        </Container>

    )

};

export default Contact;