
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Resume from './pages/Resume';
import EditorCanvas from './pages/EditorCanvas';
import JobPostings from './pages/JobPostings';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-ts-shadcn">
      <Router>
        <Routes>
          <Route path="/" element={<Resume />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/builder/:resumeId" element={<EditorCanvas />} />
          <Route path="/resume/canvas/:resumeId" element={<Resume />} />
          <Route path="/jobs" element={<JobPostings />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
