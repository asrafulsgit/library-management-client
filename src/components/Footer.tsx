import React from "react";

const Footer: React.FC = () => {
    
  return (
    <footer className="bg-neutral-900 text-gray-400 py-8 text-center">
     
        <p className="text-sm">&copy; {new Date().getFullYear()} Library Management. All rights reserved.</p>
  
    </footer>
  );
};

export default Footer;
