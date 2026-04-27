import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home      from './pages/Home';
import Simulador from './pages/Simulador';
import Xat       from './pages/Xat';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/xat"       element={<Xat />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <main className="page">
      <div className="container text-center">
        <h1 style={{ fontSize: '4rem' }}>404</h1>
        <p className="mt-2">Pàgina no trobada.</p>
      </div>
    </main>
  );
}
