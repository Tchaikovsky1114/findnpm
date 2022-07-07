import React from 'react';
import Child from './Child';


const Parent = () => {

  const onClick = () => {
    console.log('clicked!')
  }
  return (
    
      <Child color="red" onClick={onClick}>
        <p>asdsadasdasd</p>
      </Child>
    
  );
};

export default Parent;