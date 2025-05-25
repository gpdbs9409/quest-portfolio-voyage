// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import SchoolRoom from './components/SchoolRoom';
import HackersRoom from './components/HackersRoom';
import HKRoom from './components/HKRoom';


function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-black">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/school-room" element={<SchoolRoom />} />
          <Route path="/hackers-room" element={<HackersRoom />} />
          <Route path="/hk-room" element={<HKRoom />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;