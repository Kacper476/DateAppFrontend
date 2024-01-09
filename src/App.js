import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegistrationForm from './pages/Register';
import SelectionForm from './pages/selection';
import TokenPage from './pages/Tokenpage';
function App() {
  return (
    <Router>
      <div className="App">
        {/* Komponent Switch pozwala na wyświetlanie tylko jednego Route jednocześnie */}
        <Routes>
          {/* Ustawienie ścieżki domyślnej na /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/selection" element={<SelectionForm />} />
          <Route path="/token" element={<TokenPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;