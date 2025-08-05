import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const getStatusPill = (status) => {
    switch (status) {
      case 'In Progress':
        return <span className="text-xs font-medium text-blue-800 bg-blue-100 py-1 px-2 rounded-full">In Progress</span>;
      case 'Completed':
        return <span className="text-xs font-medium text-green-800 bg-green-100 py-1 px-2 rounded-full">Completed</span>;
      default:
        return <span className="text-xs font-medium text-gray-800 bg-gray-100 py-1 px-2 rounded-full">Draft</span>;
    }
  };

  return (
    <div 
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      // --- THIS IS THE FIX ---
      // The project object from the API has an "id" field, not "_id".
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{project.projectName}</h3>
          {getStatusPill(project.status)}
        </div>
        <p className="text-gray-500 text-sm mb-4">Client: {project.clientName}</p>
      </div>
      <div className="flex items-center justify-end mt-4 border-t border-gray-100 pt-4">
        <span className="text-sm font-semibold text-indigo-600">View Project →</span>
      </div>
    </div>
  );
};

export default ProjectCard;
