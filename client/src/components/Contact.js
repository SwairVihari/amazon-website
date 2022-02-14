import React, {useState} from 'react'
import './Contact.css'
const Contact = () => {
    const [clicked, setClicked] = useState(false)
    const submitHandler = (e) =>{
        e.preventDefault();
        setClicked(true)

    }
  return (
    <div style={{padding:'20px 10px', height:"100vh"}}  id="example-collapse-text1">
              <div className='example-collapse-text-upper'>
                 
                    <h1>Contact Us</h1>
              </div>

              <div className={clicked ? '' : 'hidden'} id='thanks'>
                  Thank you for your response!
              </div>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Name' name='name'/> <br/>
                <input type='email' placeholder='Email' name='Email'/> <br/>
                <input type='phone' placeholder='Phonno' name='Phone'/> <br/>
                
                <input type='submit' value='Register'/>
               
            </form>
    </div>
  )
}

export default Contact