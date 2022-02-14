import React from 'react'
import Footer from './Footer';
import HeadLine from './HeadLine';
import Hero from './Hero';
import MiddlePart from './MiddlePart';
import Review from './Review';
const Main = () => {
 
      return (
        <div className="App">
         <HeadLine/>
         <Hero/>
         <MiddlePart/>
         <Review/>
         <Footer/>
        </div>
      );
    }
    
    

export default Main