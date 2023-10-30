import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as appUserService from '../services/AppUserService';

const Header = () => {
    const navigate = useNavigate();
    const user = appUserService.infoAppUserByJwtToken();
    const handleLogout = () => {
        appUserService.logout();
        navigate("/home")

    }
    return (
        <>
            
            <nav class="navbar navbar-expand-lg bg-secondary  " >
                <div class="container-fluid">

                    <div class="d-flex justify-content-center d-flex align-items-center w-25">
                        <Link class="navbar-brand text-white" to="/home">
                            <img src="https://dsvn.vn/images/LOGO_n.png" height="30%" width="50%"

                            />
                            Đường Sắt Việt Nam
                            </Link>
                    </div>

                    <div className='me-end pe-5 me-5'>
                        <button class="navbar-toggler" style={{ backgroundColor: 'white' }} type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul class="navbar-nav  mb-2 mb-lg-0 ">
                                {
                                    !user ?
                                        <li className='nav-item'>
                                            <Link class="nav-link active text-white" to={"/login"}>Hãy đăng nhập để đặt vé</Link>
                                        </li>

                                        :
                                        <li class="nav-item">
                                            <Link to={`/booking`}
                                                class="nav-link active text-white" aria-current="page" >Đặt Vé</Link>
                                        </li>

                                }                                <li class="nav-item ">
                                    <a class="nav-link text-white" href="#"></a>
                                </li>
                                <li class="nav-item dropdown ">
                                    <div class="nav-link dropdown-toggle text-white" href="login.html" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        {
                                            user ? user.sub : "Tài khoản"
                                        }
                                    </div>
                                    <ul class="dropdown-menu">
                                        {
                                            user ?
                                                <li>
                                                    <a class="dropdown-item" onClick={() => handleLogout()}>
                                                        Đăng xuất
                                                    </a>
                                                </li>
                                                :
                                                <li><Link class="dropdown-item" to={"/login"}>Đăng nhập</Link></li>

                                        }

                                        <li><a class="dropdown-item" href="#">Xem thông tin</a></li>
                                        <li>
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li><a class="dropdown-item" href="#">Khác</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>

    );
}

export default Header;