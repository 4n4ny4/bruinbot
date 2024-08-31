import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Banner } from './components/Banner'; 
import {Form} from './components/Form'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
