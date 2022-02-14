import React,{useState} from 'react'
import Charlie from '../components/images/upwork_client.PNG'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap';
import "./Modal1.css"
const Modal1 = () => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [phoneNo, SetPhoneNo] = useState(0);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const submitHandler = (e) => {
      e.preventDefault()
      console.log("This is submit Handler")
  }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        👉 Access FREE TRAINING Now!
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
          <div id="example-collapse-text">
              <div className='example-collapse-text-upper'>
                   
                    <div className='form-img-container'>
                        <img src={Charlie} alt='Coach'/>
                    </div>
                    <h1>Charlie Burton</h1>
              </div>
            <form onSubmit={submitHandler}>
                <input type='text' onChange={(e)=>{SetName(e.target.value)}} placeholder='Name' name='name'/> <br/>
                <input type='email' onChange={(e)=>{SetEmail(e.target.value)}} placeholder='Email' name='Email'/> <br/>
                <input type='phone' onChange={(e)=>{SetPhoneNo(e.target.value)}} placeholder='Phonno' name='Phone'/> <br/>
                
                <input type='submit' value='Register'/>
               
            </form>
          </div>
          </Modal.Body>
  
        </Modal>
      </>
    );
  }


export default Modal1