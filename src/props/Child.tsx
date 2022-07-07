import React from 'react';


interface ChildProps {
  color: string;
  onClick: () => void
  children: React.ReactNode
}

export const Child = ({color,onClick,children}:ChildProps) => {
  return <div>
    {color}
    {children}
  <button onClick={onClick}>Click!</button>
  </div>

}


export default Child
