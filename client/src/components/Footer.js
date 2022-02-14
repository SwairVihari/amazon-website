import React, {Fragment} from 'react'
import "./Footer.css";

import Modal1 from './Modal1';
const Footer = () => {
    
  return (
    <Fragment>
        <div className='Footer'>
            <h1>🔥 Won't be around much longer! 🔥</h1>
        
        <Modal1/>
            

        <p>
        *Sales figures stated or implied are personal sales figures, or that of our students. Please understand these results are not typical. We are using these as examples of what is possible when you commit and take consistent action. We do not guarantee any earnings because your results will vary and depend on many factors, including but not limited to your background, experience, and work ethic. All business entails financial risk as well as massive and consistent effort and action.
        </p>

        <p>
        NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, This site is NOT endorsed by Google in any way.
        </p>

        <p>
        Copyright © 2022 PublishingLife.com | All Rights Reserved | <a href='/termsandcondition'>Terms of Service</a>   | <a href='/privacy'>Privacy Policy</a> | <a href='/contact'>Contact Us</a>
        </p>
        </div>
    </Fragment>
  )
}

export default Footer