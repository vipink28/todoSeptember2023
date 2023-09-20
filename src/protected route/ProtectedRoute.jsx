import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const {user} = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(user);
    useEffect(()=>{
        if(user){
            setIsLoggedIn(true);            
        }
    },[user]);

    return (
       <div> {isLoggedIn ? children:"no data"}</div>
    );
}

export default ProtectedRoute;