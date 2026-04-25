import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Home } from './pages/Home';
import { Learning } from './pages/Learning';
import { VocabularyPage } from './pages/VocabularyPage';
import { Games } from './pages/Games';
import { Progress } from './pages/Progress';
import { Parent } from './pages/Parent';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        
        <div className="lg:ml-64">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Home" />
                  <main className="p-4 md:p-6">
                    <Home />
                  </main>
                </>
              } 
            />
            <Route 
              path="/learning" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Learning Modules" />
                  <main className="p-4 md:p-6">
                    <Learning />
                  </main>
                </>
              } 
            />
            <Route 
              path="/learning/vocabulary" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Vocabulary" />
                  <main className="p-4 md:p-6">
                    <VocabularyPage />
                  </main>
                </>
              } 
            />
            <Route 
              path="/games" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Games" />
                  <main className="p-4 md:p-6">
                    <Games />
                  </main>
                </>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Progress" />
                  <main className="p-4 md:p-6">
                    <Progress />
                  </main>
                </>
              } 
            />
            <Route 
              path="/parent" 
              element={
                <>
                  <TopBar onMenuClick={handleMenuClick} title="Parent Dashboard" />
                  <main className="p-4 md:p-6">
                    <Parent />
                  </main>
                </>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;