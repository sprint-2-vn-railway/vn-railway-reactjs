import React from "react";
import Header from "./Header";
import Footer from "./Foorter";

const carouselImagePath = [
    {
        img: "https://cdnphoto.dantri.com.vn/sFDt-95ew5ph999Vcco0sujXe74=/thumb_w/1020/2023/05/31/tuyen-duong-sat-thong-nhat-cua-viet-nam-dung-dau-nhom-dep-nhat-the-gioidocx-1685509094184.png",
    },
    {
        img: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/05/31/duong-sat-viet-nam-14343665.jpg",
    },
    {
        img: "https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/08/25/tong-cong-ty-duong-sat-viet-nam.jpg"
    }
]

const cartImagePath = [
    {
        img: "https://file3.qdnd.vn/data/images/0/2022/10/14/minhanh/duong%20sat%201.jpg?dpi=150&quality=100&w=870",
        msg: "Đường sắt Việt Nam là một trong những ngành công nghiệp lâu đời của Việt Nam. Ngành Đường sắt Việt Nam ra đời năm 1881 bằng việc khởi công xây dựng tuyến đường sắt đầu tiên đi từ Sài Gòn đến Mỹ Tho dài khoảng 70 km."
    },
    {
        img: "https://static.kinhtedothi.vn/images/upload/2021/12/25/a7110c6e-d296-48e1-b536-1d5d7e194f63.jpg",
        msg: "Chuyến tàu đầu tiên khởi hành ở Việt Nam là vào ngày 20 tháng 7 năm 1885. Những năm sau đó, mạng lưới đường sắt tiếp tục được triển khai xây dựng trên khắp lãnh thổ Việt Nam theo công nghệ đường sắt của Pháp."
    },
    {
        img: "https://file1.dangcongsan.vn/data/0/images/2020/09/29/hungnm/tauhang.jpg",
        msg: "Thời kỳ chiến tranh, hệ thống đường sắt bị hư hại nặng nề. Kể từ năm 1986, Chính phủ tiến hành khôi phục lại các tuyến đường sắt chính và các ga lớn, đặc biệt là tuyến Đường sắt Bắc Nam."
    },
    {
        img: "https://vr.com.vn/uploads/content/Nhaga-Doantau/hoahuynhlien-SaiGon.jpg",
        msg: "Ngày 20 tháng 7 năm 1885 chuyến tàu đầu tiên xuất phát từ Ga Sài Gòn, vượt Sông Vàm Cỏ Đông bằng phà tại Bến Lức, đến Ga cuối cùng tại Trung tâm Thành phố Mỹ Tho đánh dấu sự ra đời của Ngành Đường sắt Việt Nam."
    },
    {
        img: "https://ivcdn.vnecdn.net/vnexpress/images/web/2021/03/24/mang-luoi-duong-sat-den-2030-1616556517.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=qgBobH8rkM4w6SRS3eMj0g",
        msg: "Ba mươi năm đầu tiên của Thế kỷ XX, để thực hiện chính sách khai thác triệt để thuộc địa, Pháp đã xây dựng một Hệ thống Đường sắt từ Bắc vào Nam, nhưng chủ yếu nhằm phục vụ công cuộc cai trị và khai thác."
    },
    {
        img: "https://cdn.tuoitre.vn/2022/11/3/tau-hoa-1562805982076212709192-1667448871520130789817.jpg",
        msg: "Để làm đường sắt ở Đông Dương, thuộc địa Đông Dương đã phải vay của chính quốc Pháp 200 triệu Franc (theo thời giá khi đó) để làm đường sắt xuyên Việt (sách Xứ Đông Dương của toàn quyền Paul Doumer)."
    },
    {
        img: "https://cafefcdn.com/zoom/600_315/2017/duongsat-1453361029364-1502781096760-0-0-374-600-crop-1502781113656-1502853437799.jpg",
        msg: "Khoản nợ đó người Đông Dương phải trả thông qua các sắc thuế nộp cho Pháp. Như vậy, những gì người Pháp đã xây dựng ở Việt Nam thực chất không phải do họ bỏ tiền ra, mà là do chính người Việt phải chi trả."
    },
    {
        img: "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/11/1215444/5-1.jpg?w=800&h=496&crop=auto&scale=both",
        msg: "Ngay sau khi Cách mạng Tháng Tám thành công, ngày 28 tháng 8 năm 1945, Chủ tịch Hồ Chí Minh đã Chính thức ký Quyết định thành lập Bộ Giao thông Công chính, trong đó có Sở Hỏa Xa - Cơ quan Quản lý và khai thác về Đường sắt."
    },
]

const Home = () => {

    return (
        <>
            <Header />
            <div className="  mt-1 mb-3">
                <div className="container">
                    <div className=" row">
                        <div className="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {carouselImagePath.map((value, index) => {
                                        return <div className="carousel-item active" key={`CI_${index}`}>
                                            <img src={value.img}
                                                style={{ height: '400px' }}
                                                className="d-block w-100" alt="..." />
                                        </div>
                                    })}

                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        {/*    introduce*/}
                        <div className="col-sm-12 col-md-6 col-xl-6 col-lg-6 d-flex align-items-center">
                            <div>
                                <div className="text-center mb-5">
                                    <h2>Tổng Công Ty Đường Sắt Việt Nam</h2>
                                </div>
                                <p>
                                    Tổng Công ty Đường sắt Việt Nam được thành lập theo Quyết định số 34/2003/QĐ-TTg ngày 4 tháng 3 năm 3
                                    năm
                                    2003 của Thủ tướng Chính phủ trên cơ sở tổ chức lại Liên hiệp Đường sắt Việt Nam.
                                    Ngày 25 tháng 6 năm 2010, Thủ tướng Chính phủ ban hành Quyết định số 973/QĐ-TTg về việc chuyển Công ty
                                    mẹ-
                                    Tổng công ty Đường sắt Việt Nam thành Công ty TNHH Một thành viên thuộc sở hữu Nhà nước.
                                    Ngày 21 tháng 1 năm 2013, Thủ tướng Chính phủ ban hành Quyết định số 198/QĐ-TTg phê duyệt Đề án tái cơ
                                    cấu
                                    Tổng công ty Đường sắt Việt Nam giai đoạn 2012 - 2015 theo đề nghị của Bộ trưởng Bộ Giao thông vận tải
                                    và
                                    Hội đồng thành viên Tổng công ty Đường sắt Việt Nam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Carousel*/}
                <div className="text-center d-flex justify-content-center mt-5">
                    <div className=" container row">
                        {
                            cartImagePath.map((value, index) => {
                                return (
                                    <div key={`CIP_${index}`}
                                        className="col-sm-12 col-md-3 col-lg-3 col-xl-3 p-4 "
                                    >
                                        <div
                                            className="card "
                                            style={{ width: '18rem' }}>
                                            <img src={value.img} className="card-img-top" alt="..." style={{ height: '10rem' }} />
                                            <div className="card-body" style={{ height: '12rem' }}>
                                                <p className="card-text text-start">{value.msg}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Home;