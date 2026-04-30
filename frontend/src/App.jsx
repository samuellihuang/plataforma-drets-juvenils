import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Home      from './pages/Home';
import Simulador from './pages/Simulador';
import Xat       from './pages/Xat';
import styles    from './App.module.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/"          element={<Home />} />
      <Route path="/simulador" element={<Simulador />} />
      <Route path="/xat"       element={<Xat />} />
      <Route path="*"          element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <AnimatedRoutes />
    </div>
  );
}

function NotFound() {
  return (
    <main className="page">
      <div className="container text-center">
        <h1 style={{ fontSize: '4rem', opacity: 0.15 }}>404</h1>
        <h2 style={{ marginTop: '1rem' }}>Pàgina no trobada</h2>
        <p className="mt-2">La pàgina que cerques no existeix.</p>
      </div>
    </main>
  );
}
