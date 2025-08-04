import React, { useState } from 'react';
import Icon from './Icon';

const ProjectCard = ({ project }) => {
  const [copied, setCopied] = useState(false);

  const getStatusPill = (status) => {
    switch (status) {
      case 'Survey Sent':
        return <span className="text-xs font-medium text-blue-800 bg-blue-100 py-1 px-2 rounded-full">Survey Sent</span>;
      case 'Report Ready':
        return <span className="text-xs font-medium text-green-800 bg-green-100 py-1 px-2 rounded-full">Report Ready</span>;
      default:
        return <span className="text-xs font-medium text-gray-800 bg-gray-100 py-1 px-2 rounded-full">Draft</span>;
    }
  };
  
  const handleCopy = () => {
    const link = `${window.location.origin}/survey/${project.id}`;
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{project.projectName}</h3>
          {getStatusPill(project.status)}
        </div>
        <p className="text-gray-500 text-sm mb-4">Client: {project.clientName}</p>
      </div>
      <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <Icon path={copied ? "M4.5 12.75l6 6 9-13.5" : "M8.25 7.5H12M8.25 12H12m8.25-4.5v7.5A2.25 2.25 0 0118.75 18H5.25A2.25 2.25 0 013 15.75V8.25A2.25 2.25 0 015.25 6H10"} className="w-5 h-5" />
          {copied ? 'Copied!' : 'Copy Survey Link'}
        </button>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          View Report
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;