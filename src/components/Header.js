import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


    return (
        <>
            <nav class="navbar navbar-expand-lg bg-dark ">
                <div class="container-fluid">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="https://dsvn.vn/images/LOGO_n.png" height="50%" width="50%" />
                        <a class="navbar-brand text-white" href="#">Đường Sắt Việt Nam</a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li class="nav-item">
                                <Link to={`/booking`}
                                class="nav-link active text-white" aria-current="page" >Đặt vé</Link>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link text-white" href="#"></a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="login.html" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Chức năng
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to={"/login"}>Đăng nhập</Link></li>
                                    <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                                    <li><a class="dropdown-item" href="Detail.html">Xem thông tin</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li><a class="dropdown-item" href="#">Khác</a></li>
                                </ul>
                            </li>

                        </ul>
                        <div class="d-flex d-flex align-items-center">
                            <input class="form-control me-2" type="search" placeholder="tìm kiếm" aria-label="Search" />
                            <button class="btn btn-outline-light" type="submit">Tìm</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );
}

export default Header;