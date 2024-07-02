import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from 'react-router-dom';
import Login from './Screen/login';
import NotFound from './Screen/NotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
