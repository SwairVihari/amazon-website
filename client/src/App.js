import './App.css';
import Main from './components/Main';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Contact from './components/Contact.js'
import Amazon from './amazon/amazon.js'
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/" element={<Main/>}/>
      <Route exact path="/termsandcondition" element={<Terms/>}/>
      <Route exact path="/privacy" element={<Privacy/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/amazon" element={<Amazon/>}/>

      </Routes>
    </Router>
    </div>
  );
}

export default App;
