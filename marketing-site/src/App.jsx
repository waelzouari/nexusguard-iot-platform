import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Product from './components/Product.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Impact from './components/Impact.jsx';
import Footer from './components/Footer.jsx';
import OrderModal from './components/OrderModal.jsx';

export default function App() {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);
  const close = () => setModal(false);
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar onOrder={open} />
      <Hero onOrder={open} />
      <Product onOrder={open} />
      <HowItWorks onOrder={open} />
      <Impact onOrder={open} />
      <Footer />
      <OrderModal isOpen={modal} onClose={close} />
    </div>
  );
}
