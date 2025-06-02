import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#222' }}>
      <Header />
      <Sidebar />
      <main
        style={{
          marginLeft: 180,
          marginTop: 40,
          background: '#fafafa',
          borderRadius: 8,
          boxShadow: '0 1px 4px #0001',
          padding: 24,
          minHeight: 'calc(100vh - 56px)',
          marginRight: 16,
        }}
      >
        {/* Main content will go here */}
      </main>
    </div>
  );
}

export default App;
