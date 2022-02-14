import React, {Fragment} from 'react'
import './Timer.css'

// const Timer = () => {
//    const [seconds , setSeconds] = useState();
//    const [minutes, setMinutes] = useState();

//     let time = new Date().getTime()
//     let time5 = new Date(time + 5*60000);
  
//     window.setInterval(function(){
//       let newTime = new Date().getTime();
//       let diff =  time5- newTime ;
//         let min = Math.trunc(diff/60000);
//         let second = Math.trunc((diff - min*60000)/1000);
//         setMinutes(min);
//      setSeconds(second);

//     // console.log(`min = ${min} and seconds = ${second}` )
      
//     },2000)

const Timer = ({hoursMinSecs}) => {
   
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    

    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) 
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    
  return (
    <Fragment>
        <div className='Timer'>
            <div className='Time-container'>
                <div className='hour'>
                   <h1> {hrs.toString().padStart(2, '0')} </h1>
                </div>
                <p>HOUR</p>
            </div>
            <div className='Time-container'>
            <div className='minute'>
                 <h1>
                    {mins.toString().padStart(2, '0')}
                 </h1>
                </div>
                <p>MINUTES</p>
            </div>
            <div className='Time-container'>
            <div className='second'>
                    <h1>
                    {secs.toString().padStart(2, '0')}
                    </h1>
                </div>
                <p>SECONDS</p>
            </div>
        </div>
    </Fragment>
  )
}

export default Timer