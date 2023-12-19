import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useMain from '../hooks/useMain';

const PrivateRoute = () => {
    const location = useLocation();
    const context = useMain();
    let authFlag = true;
    let role=['ADMIN'];

    useEffect(() => {
        getData();
    }, [location]);

    const getData = async () => {
        if (!localStorage.getItem('sb_token')) {
            authFlag = false;
        }

        // console.log(authFlag);
        if (!authFlag) {
            localStorage.removeItem('sb_token');
        }

        // if(!authFlag && ( role.length===1 && ['USER', 'ADMIN'].some(e=>role.includes(e)) ))
        if(!authFlag)
        {
            window.location.href="/auth/login";
        }
    };

    return (
        <Outlet />
    )
};

export default PrivateRoute;
