import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegistrationForm from './pages/Register';
import SelectionForm from './pages/selection';
import TokenPage from './pages/Pairs';
import Chat from './pages/chsat';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/selection" element={<SelectionForm />} />
          <Route path="/Pairs" element={<TokenPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;