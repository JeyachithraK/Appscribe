import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import Icon from '../components/Icon';

const DashboardPage = ({ setPage }) => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real app, this would fetch data from your FastAPI backend
  useEffect(() => {
    // Placeholder data for MVP
    const initialProjects = [
      { id: 'a1b2c3d4', projectName: 'E-commerce Platform', clientName: 'Global Retail Inc.', status: 'Report Ready' },
      { id: 'e5f6g7h8', projectName: 'Corporate Landing Page', clientName: 'Innovate Solutions', status: 'Survey Sent' },
    ];
    setProjects(initialProjects);
  }, []);

  const addProject = ({ projectName, clientName }) => {
    const newProject = {
      id: crypto.randomUUID(), // Generate a unique ID
      projectName,
      clientName,
      status: 'Draft',
    };
    // In a real app, you would POST this to your backend
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon path="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" className="w-8 h-8 text-indigo-600"/>
            <h1 className="text-2xl font-bold text-gray-900">Vibe Coder Projects</h1>
          </div>
          <button onClick={() => setPage('login')} className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Client Dashboard</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:bg-indigo-700 transition-all"
          >
            <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5"/>
            Create New Project
          </button>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-semibold text-gray-900">No projects yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first client project.</p>
          </div>
        )}
      </main>
      
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProject={addProject} />
    </div>
  );
};

export default DashboardPage;