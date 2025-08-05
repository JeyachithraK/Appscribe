import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed: npm install axios

const ProjectView = () => {
  // The useParams hook still reads the "id" from the URL
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This function now fetches the project data from the backend
    const fetchProject = async () => {
      if (!id) {
        setIsLoading(false);
        setError('No project ID provided.');
        return;
      }

      try {
        // This endpoint fetches a single project by its ID
        console.log('Fetching project details...'); 
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}`);
        setProject(response.data);
      } catch (err) {
        setError('Failed to fetch project details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]); // This effect runs whenever the ID in the URL changes

  // Render a loading state while fetching data
  if (isLoading) {
    return <div className="p-8 text-center">Loading project details...</div>;
  }

  // Render an error message if the fetch fails
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Render a message if no project was found
  if (!project) {
    return <div className="p-8 text-center">Project not found.</div>;
  }

  // Render the project details once data is successfully fetched
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-indigo-600 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold">{project.projectName}</h1>
        <p className="mt-2 text-gray-600">Client: {project.clientName}</p>
        
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Client Requirements Report</h2>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-800 whitespace-pre-wrap font-mono">
            {project.report}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
