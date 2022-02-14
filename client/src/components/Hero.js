import React, {Fragment} from 'react'

import "./Hero.css"
import Modal1 from './Modal1'

import Timer from './Timer'
const Hero = () => {
  const hoursMinSecs = {hours:0, minutes: 5, seconds: 30}


    
  return (
    <Fragment>
        <div className='Hero'>
            <h1 className='Hero_text'>The <span>New Way To Make Passive 💰</span>
            On Amazon, Without Selling Physical Products! </h1>

            <h1 className='Hero_red Hero_subtext'><span>The best part?</span>
            You don’t need to buy any inventory, ship out products, or even sell on Amazon to profit!</h1>

            

        <Modal1/>

        <Timer hoursMinSecs={hoursMinSecs}/>

            <p className='Hero__p'>
            Sales figures stated or implied are personal sales figures, or that of our students. Please understand these results are not typical. We are using these as examples of what is possible when you commit and take consistent action. We do not guarantee any earnings because your results will vary and depend on many factors, including but not limited to your background, experience, and work ethic. All business entails financial risk as well as massive and consistent effort and action.
            </p>
        </div>

        

    </Fragment>
  )
}

export default Hero