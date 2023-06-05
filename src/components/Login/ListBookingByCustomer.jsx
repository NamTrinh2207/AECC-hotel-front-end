import {useState} from "react";
import {Button} from "antd";
import BookingsOfCustomer from "./BookingsOfCustomer";
import CancelRequestOfCustomer from "./CancelRequestOfCustomer";
import RentalOfCustomer from "./RentalOfCustomer";

export default function ListBookingByCustomer(props) {
    const user = props.user;
    const [showCancelRequest, setShowCancelRequest] = useState(false);
    const [showCheckedCustomer, setShowCheckedCustomer] = useState(false);
    const [showUncheckedCustomer, setShowUncheckedCustomer] = useState(true);
    const [activeButton, setActiveButton] = useState('bookingNow');

    const handCancelRequest = () => {
        setShowCancelRequest(true);
        setShowCheckedCustomer(false);
        setShowUncheckedCustomer(false)
        setActiveButton('cancelRequest');
    }
    const handleCheckedCustomer = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(true);
        setShowUncheckedCustomer(false)
        setActiveButton('rentalHistory');
    }

    const handleShowUncheckedCustomer = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(false);
        setShowUncheckedCustomer(true);
        setActiveButton('bookingNow');

    };

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <Button onClick={handleShowUncheckedCustomer}
                                className={activeButton === "bookingNow" ? 'active' : ''}
                                style={{
                                    backgroundColor: activeButton === "bookingNow" ? '#3F56FF' : 'transparent',
                                    color: activeButton === "bookingNow" ? '#ffffff' : '#000000',
                                    width:250,
                                    height:40,
                                    fontSize:15,
                                }}>
                            Đang thuê
                        </Button>
                    </td>
                    <td>
                        <Button onClick={handleCheckedCustomer}
                                className={activeButton === "rentalHistory" ? 'active' : ''}
                                style={{
                                    backgroundColor: activeButton === "rentalHistory" ? '#3F56FF' : 'transparent',
                                    color: activeButton === "rentalHistory" ? '#ffffff' : '#000000',
                                    width:250,
                                    height:40,
                                    fontSize:15,
                                }}>
                            Lịch sử thuê
                        </Button>
                    </td>
                    <td>
                        <Button onClick={handCancelRequest}
                                className={activeButton === "cancelRequest" ? 'active' : ''}
                                style={{
                                    backgroundColor: activeButton === "cancelRequest" ? '#3F56FF' : 'transparent',
                                    color: activeButton === "cancelRequest" ? '#ffffff' : '#000000',
                                    width:250,
                                    height:40,
                                    fontSize:15,
                                }}>
                            Đã hủy
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div>
                <div>
                    <div>
                        {showCancelRequest ? (
                            <div>
                                <CancelRequestOfCustomer user={user}/>
                            </div>
                        ) : null}
                        {showCheckedCustomer ? (
                            <div>
                                <RentalOfCustomer user={user}/>
                            </div>
                        ) : null}
                        {showUncheckedCustomer ? (
                            <div>
                                <BookingsOfCustomer user={user}/>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}