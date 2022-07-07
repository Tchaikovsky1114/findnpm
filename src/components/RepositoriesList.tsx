import React from 'react';

interface childProps {
  children: React.ReactNode
}

const RepositoriesList = () => {
  return (
    <div>
      <form >
        <input type="text" />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;