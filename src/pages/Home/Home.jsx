import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/banner');
  },[]);

  return (
    <DefaultLayout>
        This is home
    </DefaultLayout>
  )
}

export default Home;
