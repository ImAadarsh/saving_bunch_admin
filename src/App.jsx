import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainState from './context/MainState';
import Home from './pages/Home/Home';
import { toast } from 'react-toastify';
import Alert from './Util/Alert';
import Coupan from './pages/Coupan/Coupan';
import Email from './pages/Email/Email';
import Banner from './pages/Banner/Banner';
import Category from './pages/Category/Category';
import Store from './pages/Store/Store';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import SignIn from './pages/Authentication/SignIn';
import Submission from './pages/Submission/Submission';

// import Blog from './pages/Email/Email';
// import SignIn from './pages/Authentication/SignIn'
// import SignUp from './pages/Authentication/SignUp'
// import PrivateRoute from './PrivateRoute/PrivateRoute';
// import Contact from './pages/Contact/Contact';
// import Job from './pages/Job/Job';
// import Work from './pages/Work/Work';
// import User from './pages/User/User';
// import Subscription from './pages/Subscription/Subscription';
// import Category from './pages/Category/Category';
// import JobApplicants from './pages/JobApplicants/JobApplicants';


// import Analytics from './pages/Dashboard/Analytics'
// import Profile from './pages/Profile'
// import FormElements from './pages/Form/FormElements'
// import FormLayout from './pages/Form/FormLayout'
// import Tables from './pages/Tables'
// import Settings from './pages/Settings'
// import Chart from './pages/Chart'
// import Alerts from './pages/UiElements/Alerts'
// import Buttons from './pages/UiElements/Buttons'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, []);

  const notify = (type, message) => {
    if (type === 'success') {
      toast.success(message);
    }
    else {
      toast.error(message);
    }
  };

  return (
    !loading && (
      <>
        <MainState setProgress={setProgress}>
          <Alert />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Home notify={notify} />} />
              <Route path='/banner' element={<Banner notify={notify} />} />
              <Route path='/category' element={<Category notify={notify} />} />
              <Route path='/coupan' element={<Coupan notify={notify} />} />
              <Route path='/email' element={<Email notify={notify} />} />
              <Route path='/store' element={<Store notify={notify} />} />
              <Route path='/submissions' element={<Submission notify={notify} />} />
              {/* <Route path='/users' element={<User notify={notify} />} /> */}
            </Route>

            <Route path='/auth/login' element={<SignIn notify={notify} />} />

            {/* <Route path='/auth/signup' element={<SignUp notify={notify} />} /> */}
            {/* <Route path='/profile' element={<Profile />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/forms/form-layout' element={<FormLayout />} />
          <Route path='/tables' element={<Tables />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
 */}
          </Routes>
        </MainState>
      </>
    )
  )
}

export default App
