import React, { ChangeEvent, FormEvent, useState } from 'react';
import LoadingSpinner from '../shared/UI/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../store/hooks/useActions' 
import {searchRepositories} from '../store/slices/RepositorySlice'
import RepositoriesItem from './RepositoriesItem';


interface childProps {
  children: React.ReactNode
}

const RepositoriesList = () => {
  const dispatch = useAppDispatch();
  const [inputVal, setInputVal] = useState('');
  const {data,error,loading} = useAppSelector((state) => state.repositories);
  
  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(searchRepositories(inputVal))
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  // if(!error && !loading && data.length === 0){
  //   return <h3>Could not found {inputVal}</h3>
  // }


  return (
    <div className='p-4'>
      <form className='flex justify-between items-center' onSubmit={onSubmit}>
        <input type="text" value={inputVal} onChange={onChange} className='py-2 px-4 outline-2 outline-rose-400 font-bold ' />
        <button className='border py-2 px-4 border-slate-600 font-bold flex items-center'>Search{loading && <LoadingSpinner />}</button>
      </form>
      {error && <h3>{error}</h3>}
      
      
      
      <RepositoriesItem data={data} error={error} loading={loading} />
      
    </div>
  );
};

export default RepositoriesList;