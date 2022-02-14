import React, {Fragment} from 'react'
import "./MiddlePart.css"

import two_people from '../components/images/two_people.jpg'
import Modal1 from './Modal1'
const MiddlePart = () => {
    
  return (
    <Fragment>
        <div className='middle_part'>
            <div className='img_container'>
                <img src={two_people} alt=''></img>
            </div>

            <div className='middle_part_Text'>
                 <h1>
                     *In this short training, you will discover...
                 </h1>

                 <p>
                 <i className="fa fa-money"></i> 
                 <p>
                 ​The TRILLION DOLLAR industry behind this new Amazon opportunity (you'll never guess it)
                 </p>
                 </p>

                 <p>
                 <i className="fa fa-list"></i> 
                 <p>
                 The 4-step process anyone can do to generate stress-free income on Amazon
                 </p>
                 </p>

                 <p>
                 <i className="fa fa-dollar"></i> 
                 <p>
                 ​​Get 3 FREE BONUSES when you attend now and stick around
                 </p>
                 </p>

                 <Modal1/>

            </div>
        </div>
    </Fragment>
  )
}

export default MiddlePart