import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} ChurnBuster. All rights reserved.</p>
    </footer>
  );
};

export default Footer; 