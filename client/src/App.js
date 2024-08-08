import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
