import React, {useEffect, useState} from 'react';
import TopHeader from "./header/TopHeader";
import Footer from "./footer/Footer";
import {useParams} from "react-router-dom";
import axios from "axios";
import MainHeader from "./header/MainHeader";
import BookingCard from "./BookingCard";
import ScrollToElement from "./scrollToElement/Scroll";
import MapPage from "./map/MapPage";
import ShowReview from "./review/ShowReview";
import ReviewForm from "./review/ReviewForm";

function HotelDetails(props) {
    const {id} = useParams();
    const [home, setHome] = useState(null);
    const [firstBooking, setFirstBooking] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
        var userId = user.id;
    }

    useEffect(() => {
        const getHome = async () => {
            try {
                if (!home) {
                    const response = await axios.get(`http://localhost:8080/homes/${id}`);
                    setHome(response.data);
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        getHome();

        const getBooking = async () => {
            try {
                if (!home) {
                    const response = await axios.get(`http://localhost:8080/customer/bookings/get-first/home-id=${id}/user-id=${userId}`);
                    setFirstBooking(response.data);
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        getBooking();
    }, [home, id]);

    console.log("booking", firstBooking)
    const getStatusLabel = (status) => {
        switch (status) {
            case 1:
                return 'Phòng trống';
            case 2:
                return 'Đang bảo trì';
            case 3:
                return 'Đang cho thuê';
            default:
                return 'Unknown';
        }
    };

    return (
        <>
            <TopHeader/>
            {/* Top header end */}
            <MainHeader/>
            {/* Sub banner start */}
            <div className="sub-banner">
                <div className="container">
                    <div className="breadcrumb-area">
                        <h1>Thông tin chi tiết</h1>
                        <ul className="breadcrumbs">

                            <li><a href="/">Trang chủ</a></li>
                            <li className="active">Chi tiết homestay</li>
                        </ul>
                        <br/><br/>
                        <ScrollToElement targetId={"main-home"}></ScrollToElement>
                        <div id={"main-home"}></div>
                    </div>
                </div>
            </div>
            {/* Sub banner end */}

            {/* Properties details page start */}

            {/*<div id="main-home"></div>*/}
            <div className="properties-details-page content-area-2" key={home?.id}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="propertiesDetailsSlider"
                                 className="carousel properties-details-sliders slide mb-60">
                                <div className="heading-properties-2">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="informeson">
                                                <h1>{home?.name}<span>{home?.priceByDay >= 10000 ? home?.priceByDay.toLocaleString() : home?.priceByDay} VNĐ/ngày</span>
                                                </h1>
                                                <div>
                                                    <div className="float-left">
                                                        <ul className="clearfix">
                                                            <li><i className="flaticon-bed"></i> Phòng
                                                                ngủ: {home?.bedroom}</li>
                                                            <li><i className="flaticon-bath"></i> Phòng
                                                                tắm: {home?.bathroom}</li>
                                                            <li><i className="flaticon-house"></i> Loại
                                                                phòng: {home?.homeType.name}</li>
                                                            <li><i className="flaticon-calendar"></i> Trạng
                                                                thái: {getStatusLabel(home?.status)}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="float-right">
                                                        <p>
                                                            <span>Đánh giá: </span>{[...Array(home?.rating)].map((_, index) => (
                                                            <i className="fa fa-star" style={{color: "orange"}}
                                                               key={index}></i>))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{overflow: "clip", position: "relative"}}>
                                    {home?.image.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`item carousel-item ${index === 0 ? 'active' : ''}`}
                                            data-slide-number={index}
                                        ><img style={{height: "600px", width: 1500}} src={image}
                                              alt="properties-photo"/>
                                        </div>
                                    ))}
                                </div>
                                <ul className="carousel-indicators mt-3 sp-2 smail-properties list-inline nav nav-justified ">
                                    {home?.image.map((image, index) => (
                                        <li key={index} className={`list-inline-item ${index === 0 ? 'active' : ''}`}>
                                            <a
                                                id={`carousel-selector-${index}`}
                                                className={index === 0 ? 'selected' : ''}
                                                data-slide-to={index}
                                                data-target="#propertiesDetailsSlider"
                                            >
                                                <img style={{height: "150px", left: 0}} src={image}
                                                     className="img-fluid p-1" alt="properties-photo-smale"/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 slider">
                            {/* Search area start */}
                            <div className="property-details mb-45 underline">
                                <h3 className="heading-3">Thông tin chi tiết</h3>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Tên:</strong>{home?.name}
                                            </li>
                                            <li>
                                                <strong>Phân khúc:</strong>{home?.homeType.name}
                                            </li>
                                            <li>
                                                <strong>Giá
                                                    thuê:</strong>{home?.priceByDay >= 10000 ? home?.priceByDay.toLocaleString() : home?.priceByDay} VNĐ/ngày
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Trạng thái:</strong>{getStatusLabel(home?.status)}
                                            </li>
                                            <li>
                                                <strong>Địa chỉ:</strong>{home?.address}
                                            </li>
                                            <li>
                                                <strong>Chủ nhà:</strong>{home?.users.name}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Liên lạc:</strong>{home?.users.phoneNumber}
                                            </li>
                                            <li>
                                                <strong>Email:</strong>{home?.users.email}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Amenities box start */}
                            <div className="amenities-box af mb-45 underline">
                                <h3 className="heading-3">Tình trạng</h3>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li><span><i className="flaticon-draw-check-mark"></i> {home?.bedroom} Phòng ngủ</span>
                                            </li>
                                            <li><span><i
                                                className="flaticon-draw-check-mark"></i> {home?.bathroom} Phòng tắm</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li><span><i className="flaticon-draw-check-mark"></i> 1 Garage</span></li>
                                            <li><span><i className="flaticon-draw-check-mark"></i> {home?.bedroom} Ban công</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Property description start */}
                            <div className="property-description mb-60 underline">
                                <h3 className="heading-3">Mô tả</h3>
                                <p>{home?.description}</p>
                            </div>
                            <div className={"review mb-45 underline"}>
                                <ShowReview/>
                            </div>
                            {firstBooking.done === true && <div className={"review amenities-box af mb-45 underline"}>
                                <ReviewForm homeId={id} userId={userId}/>
                            </div>}
                            {/* Property details start */}
                            {/* Related properties start */}

                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="">
                                <div>
                                    {/*<h1>chỗ này là đặt phòng, chọn ngày, giá tiền</h1>*/}
                                    <BookingCard price={home?.priceByDay} rating={home?.rating} homeId={home?.id}
                                                 homeStatus={home?.status}/>
                                </div>
                                {/* Recent posts start */}
                            </div>
                        </div>
                        <div className={"amenities-box af mb-45"}>
                            <MapPage address={home?.address}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Properties details page start */}
            {/* Footer start */}
            <Footer/>
            {/* Footer end */}
            {/* Property Video Modal */}
        </>
    );
}

export default HotelDetails;