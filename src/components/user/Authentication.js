import React from 'react';
import * as appUserService from '../../services/AppUserService';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Authentication = () => {
    const user = appUserService.infoAppUserByJwtToken();


    let roles;
    if (user) {
        const exp = user.exp
        const iat = user.iat
        roles = user.roles
    }

    return user ? <Outlet/> : <Navigate to={"/401"}/>
};

export default Authentication;