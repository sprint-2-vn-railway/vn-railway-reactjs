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

                    <div class="d-flex justify-content-center d-flex align-items-center">
                        <Link class="navbar-brand text-white" to="/home">
                            <img src="https://dsvn.vn/images/LOGO_n.png" height="30%" width="50%"

                            />
                            Đường Sắt Việt Nam</Link>
                    </div>
                    <div class="scrolling-text-container">
                        <div class="scrolling-text text-light">
                        Đường sắt nhận đăng ký mua vé tàu tập thể Tết Giáp Thìn 2024 tại các nhà ga 
                        đến 16h00 ngày 10/10/2023; dự kiến mở bán vé tập thể từ 8h00 ngày 15/10 
                        đến ngày 22/10/2023 (với mỗi lượt từ 5 vé trở lên)
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Đường sắt Bắc - Nam vinh dự được Lonely Planet bình chọn là tuyến đường đẹp nhất, 
                        đáng trải nghiệm nhất thế giới
                        </div>
                    </div>
                    <div className='me-end pe-5 me-5'>
                        <button class="navbar-toggler" style={{ backgroundColor: 'white' }} type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul class="navbar-nav  mb-2 mb-lg-0 ">
                                <li class="nav-item">
                                    <Link to={`/booking`}
                                        class="nav-link active text-white" aria-current="page" >Đặt Vé</Link>
                                </li>
                                <li class="nav-item ">
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