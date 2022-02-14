import React, { useState, useEffect, useRef } from 'react'


import LeadForm from '../components/Forms/LeadForm/LeadForm.js'
import { Container, Image, Col, Row, Modal, Button } from 'react-bootstrap'
//import RegisterMessage from '../../../Forms/LeadForm/RegisterMessage/RegisterMessage.js'
import RegisterMessage from '../components/Forms/LeadForm/RegisterMessage/RegisterMessage.js'

// import SideBar from '../src/Sidebar.js'
import styles from './amazon.module.css'


const Lp = props => {
  const [showRegisterMessage, setShowRegisterMessage] = useState(false)
  const [registerTitle, setRegisterTitle] = useState('')
  const [registerMessage, setRegisterMessage] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [isLeadSaved, setIsLeadSaved] = useState(false)

  const [date, setDate] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [isBottomScreen, setIsBottomScreen] = useState(true)

  const signupRef = useRef(null)
  const topPageRef = useRef(null)


  useEffect(() => {
    setDates()
    window.addEventListener('scroll', scrollHandler);
    topPageRef.current.scrollIntoView()

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  const setDates = () => {
    const date = new Date()
    switch (date.getDay()) {
      case 0:
        setDay('Sunday');
        break;
      case 1:
        setDay('Monday');
        break;
      case 2:
        setDay('Tuesday');
        break;
      case 3:
        setDay('Wednesday');
        break;
      case 4:
        setDay('Thursday');
        break;
      case 5:
        setDay('Friday');
        break;
      case 6:
        setDay('Saturday');
        break;

      default:
        break;
    }

    setMonth(date.getMonth() + 1)
    setDate(date.getDate());
    setYear(date.getFullYear());
  }

  const saveError = (error) => {
    setRegisterTitle('Registeration Failed...')
    setRegisterMessage(error)
    setShowRegisterMessage(true)
    setIsLoading(false)
  }

  const savedSuccess = () => {
    setIsLeadSaved(true)
    setRegisterTitle('Thank you for registering.')
    setRegisterMessage('Stay tuned and available for a call from your personal manager to help you get started')
    setShowRegisterMessage(true)
    setIsLoading(false)
  }

  const modalclose = () => {
    setShowRegisterMessage(false)
  }

  const onClickRegister = () => {
    setIsLoading(true)
  }


  const scollToRegister = () => {
    signupRef.current.scrollIntoView()
  }

  const scrollHandler = () => {
    if (window.pageYOffset + window.innerHeight >= signupRef.current.offsetTop) {
      setIsBottomScreen(false)
    } else {
      setIsBottomScreen(true)
    }
  }
  return (
    <>
      <div ref={topPageRef}></div>

      <Image className={styles.headMobile} width='100%' src='/images/ie/iemobilemenu.jpg' />
      <Container className={styles.bodyContainer} >

        <Image width='100%' src='/images/ie/headerfemale.jpg' />

        <h1 className={styles.title}>
          <u>The Amazon Millionaire:</u> Emily 28-year old earns €20,000 a month with Amazon Trader!
        </h1>
        <p>
          'The life-changing opportunity for normal hard-working Irish residents to make some extra money'

        </p>
        <p>
          <b>
            Emily discovered an automated Amazon Stocks trading platform, called Amazon Trader. The idea was simple: allow the average
            person the opportunity to cash in on the Amazon Stocks boom. Even if they have
            absolutely no investing or technology experience.

          </b>
        </p>
        <p>
          A user would simply make an initial
          deposit into the platform, usually of €250 or more, and the automated
          trading algorithm would go to
          work. Using a combination of data and
          machine learning, the algorithm would know the
          perfect time to buy Amazon Stocks low and
          sell high, maximising the user's profit.

        </p>
        <h4>
          If you had invested just €250 in Amazon Stocks back in 2010 you would now enjoy dividends
          of €10 Million!

        </h4>
        <Image width='100%' src='/images/ie/header2.jpg' />
        <h4>
          Emily decided to put Amazon Trader to the test, to see if it was really possible for you to
          make money using the platform.

        </h4>
        <br />
        <p>
          <b>Here's the deal:</b> We quickly discovered that the platform charges a commission of
          2% on profits a user generates and you need to make a minimum deposit of €250 to get
          started. That money will be your initial investment, which the trading software uses to
          trade.

        </p>
        <p>
          <b>Also, we learnt that Amazon Trader makes money by buying when the price goes up AND when the price goes down.
            This is known as short-selling, and the platform handles it for you
            automatically.</b>
        </p>
        <p><b>EMILY'S RESULTS WITH AMAZON TRADER AFTER
          7 DAYS:</b>
          Emily decided to sign up for an account with Amazon,
          she made the initial deposit €250 and activated her account.

        </p>
        <p>
          Emily was able to make €73.18 in profit after 3 minutes, which was
          very impressive! She had never purchased Amazon Stocks before and never made a trade in
          her life, yet here she was able to generate profits.

        </p>
        <p>
          She spent
          about 5 minutes
          a day checking her results, and after 5 days, the platform had traded up to a massive
          total
          of €6030. That is a 2400% increase in her initial deposit. She was starting to become a
          true believer in this platform.
        </p>
        <Image width='100%' src='/images/ie/header3.jpg' />
        <p>After 7 Days her initial investment had traded up to €18,930. At this point, her mind was
          racing with possibilities of
          all the things she could spend that money on. This is more money than Emily had made at work and
          she spent less than
          30 minutes checking the platform.
        </p>
        <p>
          Emily decided to keep her account active because she wanted to see how high
          it could go. Emily's account eventually
          hit a peak of €26,380.10 but had a negative -€79.51 trade. Ishe had looked through her trading
          logs and discovered that not
          every trade is profitable, some actually lose money.

        </p>
        <p>
          The platform isn't magic, but after 70% of her trades were profitable, the net result was
          €26,300.59 from her initial
          deposit of €250. It took her less than 30 minutes of work a week and absolutely no
          technical or investing experience.

        </p>
        <p>
          As you can see from the screenshot below,  she decided to use the 'withdraw funds' function
          to withdraw €6,300.59 from
          her account.

        </p>
        <p>
          <Image width='100%' src='/images/ie/pro.jpg' />
          <em><center> Emily easily withdrew from her Amazon account</center></em>
        </p>
        <p>
          All in all, she was able to make  an average of from €20,000 per month using Amazon Trader, her best month Emily earned €26,300.59

        </p>
        <p>
          <i>Note: It took 24 hours for her money to be deposited into her personal bank
            account.</i>
        </p>

        <p>
          Right now, <strong>Amazon Trader</strong>  is allowing
          our readers to try the platform for a minimum initial deposit of just €250.
          You can withdraw this amount any time you want.

        </p>

        <p>Given the massive increase in popularity of the trading platform, this initial minimum
          deposit may increase!
        </p>
        <p><b>It is crucial that you sign up for Amazon Trader  immediately, as I do not know how many places will be available</b></p>
        <p> You can fund your account via credit card or a bank transfer.</p>
        <p><b> There are three steps to get started: </b></p>
        <p>
        1. Sign Up For A Free Account
        <br/>
        <br/>
        2.Receive an introduction call deposit The Minimum €250
        <br/>
        <br/>
          
        3. Use The Amazon Stocks Trading Platform To Earn Profits                                           
        </p>
        <p>
          <i>Note:  You can withdraw your profits or initial deposit at <strong>ANY</strong> time by using
                              the 'Withdraw' button inside the platform
                           </i>
        </p>
        <br />
        <Image width='100%' src='/images/ie/calleng.jpg' />
        <RegisterMessage
          title={registerTitle}
          message={registerMessage}
          show={showRegisterMessage}
          modalclose={() => modalclose()}
        />

        <LeadForm
          offer='Amazon Trader'
          geo='ir'
          savedSuccess={() => savedSuccess()}
          saveError={(error) => saveError(error)}
          btnDisabled={loading}
          onClickRegister={() => onClickRegister()}
          trackingId={props.trackingId}
        />

      
        <div ref={signupRef}></div>
        

        {
          isBottomScreen && !isLeadSaved ? <Button style={{width:"100vw"}} className="fixed-bottom btn btn-success" size="lg" block onClick={() => scollToRegister()}>
            Click To Join
          </Button> : ''
        }
      </Container>
     
    </>
  )
}

export default Lp