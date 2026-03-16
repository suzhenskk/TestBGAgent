import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// Placeholder components for routes that are not yet implemented
const ProjectDetail = () => (
  <div className="min-h-screen flex items-center justify-center text-3xl font-bold bg-white dark:bg-black text-black dark:text-white">
    Project Detail Page (Coming Soon)
  </div>
);

const About = () => (
  <div className="min-h-screen flex items-center justify-center text-3xl font-bold bg-white dark:bg-black text-black dark:text-white">
    About Page (Coming Soon)
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
