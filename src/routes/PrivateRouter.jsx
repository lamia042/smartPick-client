import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import {AuthContext} from '../context/AuthProvider';
import Loading from '../component/Loading';

export const PrivateRouter = ({children}) => {
    const location =useLocation();
    const {isLoading, user}=useContext(AuthContext);

    if(isLoading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRouter;