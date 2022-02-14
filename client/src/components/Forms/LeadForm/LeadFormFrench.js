import React, { useState } from 'react'
import styles from './LeadForm.module.css'
import { Form, Button , Spinner } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { getCountryCallingCode } from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'
import ContactError from '../../../screens/Contact/ContactError/ContactError.js'

const LeadForm = props => {
  const [country,setCountry] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [termsAgreed,setTermsAgreed] = useState(true)
  const [isLoading,setIsLoading] = useState(false)

  
  const errorsValidation = {
    firstName: {
      message: "Le prénom est nécéssaire",
      hasError: false
  },
  lastName: {
      message: "Le nom est nécéssaire",
      hasError: false
  },
  email: {
      message: "Une adresse e-mail valide est nécéssaire",
      hasError: false
  },
  phone: {
      message: "Un numéro de téléphone valide est nécéssaire",
      hasError: false
  },
  
}
  const [formErrors,setFormErrors] = useState(errorsValidation)
  

  const inputFieldChange = e => {
    console.log(e.target.value)
    console.log(e.target.id)
    switch (e.target.id) {
      case 'firstName':
       setFirstName(e.target.value)
        break;
      case 'lastName':
        setLastName(e.target.value)
        break;
      case 'email':
         setEmail(e.target.value)
        break;
      default:
        break;
    }
  }

  const termsOnChange = e =>{
    console.log('e',e)
    console.log('e checked', e.target.checked)
    setTermsAgreed(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    checkInput()
    
    console.log('e', e)
  }

  const checkInput = ()=>{
    const isEmailValid = checkEmailValid()
    const isNamesValid = checkNameValid()
    const isValidPhone = isValidPhoneNumber(phoneValue)
  
     
    showFormErrors(isEmailValid,isValidPhone)
  
    if(isValidPhone && isEmailValid && isNamesValid){
      try{
        const prefix = parsePhoneNumber(phoneValue)
        sendLead(prefix.countryCallingCode)
      }catch(error){
        console.log(error)
      }
    
    }
  }

  const showFormErrors = (isEmailValid,isValidPhone)=>{
    const newErrors = { ...formErrors }
    firstName.length < 3  ? newErrors.firstName.hasError = true : newErrors.firstName.hasError = false;
    lastName.length < 3 ? newErrors.lastName.hasError = true : newErrors.lastName.hasError = false;
    !isEmailValid ? newErrors.email.hasError = true : newErrors.email.hasError = false;
    !isValidPhone  ? newErrors.phone.hasError = true : newErrors.phone.hasError = false;
    setFormErrors(newErrors)   

  }

  const checkEmailValid =()=>{    
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  const checkNameValid = ()=>{
    return firstName.length >= 3 && lastName.length >= 3
  }

  const sendLead = prefix =>{
    const lead = {
        firstName : firstName,
        lastName : lastName,
        email:email,
        phone : phoneValue,
        prefix: prefix,
        countryCode : props.geo,
        offer : props.offer
    }
    props.onClickRegister()
    axios.post(`/api/contact/c_lead`,lead).then(response => {
     console.log('save',response.data)
     if(response.data.savedStatus){
      window.gtag('event', 'conversion', {'send_to': 'AW-10846903576/gxnyCLv7-J0DEJi6mrQo'});

      props.savedSuccess()
     }else{
      props.saveError('Error registering please try again.')
     }
    })
    .catch(error =>{
      console.log(error)
      props.saveError('Error registering please try again.')
    })
  }
  return (
    <div className={styles.formBox}>
    <h3 className={styles.formTitle}>CHANGEZ VOTRE VIE</h3>
    <Form className={styles.formBody} onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="firstName">
        
        <Form.Control onChange={(e) => inputFieldChange(e)} type="text" placeholder="Prénom" />
        {
          formErrors.firstName.hasError ? <ContactError message={formErrors.firstName.message} /> : ''
        }
      </Form.Group>
      <Form.Group controlId="lastName">
        
        <Form.Control onChange={(e) => inputFieldChange(e)} type="text" placeholder="Nom" />
        {
          formErrors.lastName.hasError ? <ContactError message={formErrors.lastName.message} /> : ''
        }
      </Form.Group>
      <Form.Group controlId="email">
        
        <Form.Control onChange={(e) => inputFieldChange(e)} type="email" placeholder="E-mail" />
        {
          formErrors.email.hasError ? <ContactError message={formErrors.email.message} /> : ''
        }
      </Form.Group>
      <PhoneInput
        placeholder="Numéro de téléphone"
        value={phoneValue}
        onChange={setPhoneValue}
        defaultCountry={props.geo} 
        />
         {
            formErrors.phone.hasError ? <ContactError message={formErrors.phone.message} /> : ''
         }
      <Form.Group>
        <Form.Check
          defaultChecked={termsAgreed}
          onChange={(e) => termsOnChange(e)}
          label="J'accepte les termes et conditions"
          feedback="You must agree before submitting."
          required
        />
      </Form.Group>
      <Button type="submit" size="lg" block disabled={props.btnDisabled} className='btn btn-success'>
       
        {
        props.btnDisabled ? <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> :'Accédez maintenant'
        
       }
      </Button>
     
    </Form>
    </div>
  )
}
export default LeadForm