import React, {useEffect, useState } from 'react'
import styles from './LeadForm.module.css'
import { Form, Button , Spinner } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumber } from 'react-phone-number-input'
import ContactError from './ContactError/ContactError.js'

const LeadForm = props => {
  const [country,setCountry] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [termsAgreed,setTermsAgreed] = useState(true)
  const [isLoading,setIsLoading] = useState(false)
  const [campId,setCampId] = useState('0')


  useEffect(()=>{
   
    let id  = window.location.hostname
    setCampId(id)
  },[])
  const errorsValidation = {
    firstName: {
      message: "First name is required.",
      hasError: false
  },
  lastName: {
      message: "Last name is required.",
      hasError: false
  },
  email: {
      message: "Valid email address is required.",
      hasError: false
  },
  phone: {
      message: "Valid phone number is required.",
      hasError: false
  },
  
}
  const [formErrors,setFormErrors] = useState(errorsValidation)
  

  const inputFieldChange = e => {

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
 
    setTermsAgreed(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    checkInput()
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
        offer : props.offer,
        campId : campId,
        trackingId :props.trackingId
    }
    props.onClickRegister()
    axios.post(`/api/contact/c_lead`,lead).then(response => {
     console.log('save',response.data)
     if(response.data.savedStatus){         
     // window.gtag('event', 'conversion', {'send_to': 'AW-10846903576/gxnyCLv7-J0DEJi6mrQo'});
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
    <h3 className={styles.formTitle}>Change your life</h3>
    <Form className={styles.formBody} onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className={styles.formgroup} controlId="firstName">
        
        <Form.Control className={styles.formcontrol} onChange={(e) => inputFieldChange(e)} type="text" placeholder="First name" />
        {
          formErrors.firstName.hasError ? <ContactError message={formErrors.firstName.message} /> : ''
        }
      </Form.Group>
      <Form.Group className={styles.formgroup} controlId="lastName">
        
        <Form.Control className={styles.formcontrol} onChange={(e) => inputFieldChange(e)} type="text" placeholder="Last name" />
        {
          formErrors.lastName.hasError ? <ContactError message={formErrors.lastName.message} /> : ''
        }
      </Form.Group>
      <Form.Group className={styles.formgroup} controlId="email">
        
        <Form.Control className={styles.formcontrol} onChange={(e) => inputFieldChange(e)} type="email" placeholder="Email" />
        {
          formErrors.email.hasError ? <ContactError message={formErrors.email.message} /> : ''
        }
      </Form.Group>
      <PhoneInput
         containerStyle={{width:'100%', maxWidth:'800px', marginTop:'20px'}}
         inputStyle={{width:'100%', maxWidth:'800px'}}
        className={styles.PhoneInput}
        placeholder="Phone number"
        value={phoneValue}
        onChange={setPhoneValue}
        country={props.geo} 
        />
         {
            formErrors.phone.hasError ? <ContactError message={formErrors.phone.message} /> : ''
         }
      <Form.Group>
        <Form.Check
        style={{marginBottom:"10px"}}
        className={styles.formcontrol}
          defaultChecked={termsAgreed}
          onChange={(e) => termsOnChange(e)}
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          required
        />
      </Form.Group>
      <Button type="submit" size="lg" block disabled={props.btnDisabled} className='btn btn-success'>
       
        {
        props.btnDisabled ? <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> :'Give me access now'
        
       }
      </Button>
     
    </Form>
    </div>
  )
}
export default LeadForm