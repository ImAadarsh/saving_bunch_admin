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
        if (!localStorage.getItem('gravity_token')) {
            authFlag = false;
        }
        else {
            // let currentTs = new Date().getTime();
            // let rememberTs = JSON.parse(localStorage.getItem('gravity_token')).expiry;
            
            // if (rememberTs < currentTs) {
            //     if (JSON.parse(localStorage.getItem('gravity_token')).rememberMe) {
            //         // increase the time limit
            //         localStorage.setItem("gravity_token", JSON.stringify({ ...JSON.parse(localStorage.getItem("gravity_token")), rememberTs: currentTs + (24 * 60 * 60 * 1000) }))
            //     }
            //     else {
            //         // logout the user 
            //         authFlag = false;
            //     }
            // }

            // if (authFlag) {
            //     if(!role.includes(JSON.parse(localStorage.getItem('travel_user')).role))
            //     {
            //         authFlag = false;
            //     }
            //     else
            //     {
            //         if (role === 'USER') {
            //             const verify = await context.verifyUser();
            //             if (!verify.success) {
            //                 authFlag = false;
            //             }
            //         }
            //         if (role === 'ADMIN') {
            //             const verify = await context.verifyAdmin();
            //             if (!verify.success) {
            //                 authFlag = false;
            //             }
            //         }
            //     }
            // }
        }

        // console.log(authFlag);
        if (!authFlag) {
            localStorage.removeItem('gravity_token');
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
