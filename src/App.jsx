import React from 'react';

import Header from './components/features/Header';
import Hero from './components/features/Hero';
import Features from './components/features/Features';
import SetupGuide from './components/features/SetupGuide';
import Recommendations from './components/features/Recommendations';
import Footer from './components/features/Footer';

function App() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <SetupGuide />
        <Recommendations />
      </main>
      <Footer />
    </div>
  );
}

export default App;