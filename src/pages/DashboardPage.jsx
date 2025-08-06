import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewProjectModal from '../components/NewProjectModal'; // We will create this
import ProjectCard from '../components/ProjectCard';       // We will create this
import Icon from '../components/Icon';                     // Assuming you have this

const DashboardPage = ({ username }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch projects for the logged-in user
  const fetchProjects = async () => {
    if (!username) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projects/${username}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [username]);

  // Function to handle creating a new project
  const handleAddProject = async ({ projectName, clientName }) => {
    if (!projectName || !clientName || !username) {
      alert("Project name and client name are required.");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/projects', {
        projectName,
        clientName,
        owner_username: username,
      });
      // Add the new project to the start of the list and close the modal
      setProjects(prevProjects => [response.data, ...prevProjects]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Could not create project. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">AppScribe Projects</h1>
          <span className="text-sm text-gray-600">Logged in as: <strong>{username}</strong></span>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Client Dashboard</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:bg-indigo-700"
          >
            <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-5 h-5"/>
            Create New Project
          </button>
        </div>
        
        {isLoading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
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
      
      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddProject={handleAddProject} 
      />
    </div>
  );
};

export default DashboardPage;
