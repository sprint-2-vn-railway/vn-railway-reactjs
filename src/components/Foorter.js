import React from "react";

const Footer = () => {

    return (
        <>
            <footer className="text-center text-lg-start bg-light text-muted">
                {/* Section: Links  */}
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-top">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="mt-3 d-flex justify-content-center">
                            {/* Grid column */}
                            <div className="text-center w-50">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />Đường Sắt Việt Nam
                                </h6>
                                <p>
                                    Tổng công ty Đường sắt Việt Nam. Số 118 đường Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Thành phố
                                    Hà Nội, Việt Nam.
                                    Giấy chứng nhận ĐKKD số 113642 theo QĐ thành lập số 973/QĐ-TTg ngày 25/06/2010 của Thủ tướng
                                    Chính phủ.
                                    Mã số doanh nghiệp: 0100105052, đăng ký lần đầu ngày 26/07/2010, đăng ký thay đổi lần 4 ngày
                                    27/06/2014 tại Sở KHĐT Thành phố Hà Nội.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4 text-light bg-secondary">
                    © 2023
                    Ngô Hữu Hoàng Nhật
                </div>
            </footer>

        </>
    )
}

export default Footer;