import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Kanji from './pages/Kanji';
import Vocab from './pages/Vocab';
import Kana from './pages/Kana';
import Lessons from './pages/Lessons';
import JLPTPractice from './pages/JLPTPractice';
import Review from './pages/Review';
import AITutor from './pages/AITutor';
import Dialog from './pages/Dialog';
import Community from './pages/Community';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ background: '#222' }}>
        <Header />
        <Sidebar />
        <main
          style={{
            position: 'fixed',
            top: 40,
            left: 180,
            right: 0,
            bottom: 0,
            background: '#fafafa',
            padding: 24,
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanji" element={<Kanji />} />
            <Route path="/vocab" element={<Vocab />} />
            <Route path="/kana" element={<Kana />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/jlpt-practice" element={<JLPTPractice />} />
            <Route path="/review" element={<Review />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/dialog" element={<Dialog />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;