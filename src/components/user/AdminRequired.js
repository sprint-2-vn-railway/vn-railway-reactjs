import React from 'react';
import * as appUserService from '../../services/AppUserService';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRequired = () => {

    const user = appUserService.infoAppUserByJwtToken();
    let isAdmin;
    if (user) {
        isAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN")
    }

    return isAdmin ? <Outlet /> : <Navigate to={"/403"} />
};

export default AdminRequired;