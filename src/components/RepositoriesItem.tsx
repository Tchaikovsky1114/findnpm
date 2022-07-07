import React from 'react';
import { RepositoriesState } from '../store/slices/RepositorySlice';



// links:{
//   npm:string,
//   homepage:string
// }
const RepositoriesItem = ({error,loading,data}:RepositoriesState) => {
  return (
    <>
    {!error && !loading && data.map(item =>
      <ul key={item.package.name} className='border border-slate-800 my-4 px-4 leading-10 '>
      <li className='text-xl font-bold border-b py-2 border-yellow-300'><a href={item.package.links.npm}><span className=''>{item.package.name}</span></a></li>
      <li><span className='font-bold'>CurrentVersion:</span> <span>{item.package.version} version.</span></li>
      <li><span>{item.package.description}</span></li>
      </ul>
      )}
  </>
  )
    
};

export default RepositoriesItem;