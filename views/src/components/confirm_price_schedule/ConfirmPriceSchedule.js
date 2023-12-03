import React, { useState, useEffect, useRef} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../confirm_price_schedule/ConfirmPriceSchedule.css"
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from "universal-cookie";
import {useParams} from 'react-router-dom';

const cookies = new Cookies();

  
function Confirm () {
    
    const order_info = {cus_name: "Phạm Thị A",
                      type: "Sửa máy giặt",
                      address: "QL1B - Phường XX, Quận XX, tp. HCM",
                      status_response: 1,
                      staff_name: "Thợ sửa 1",
                      cus_phone_number: "012345678",
                      staff_phone_number: "012345679",
                      order_id: "1012"
                    };
    const [info_order, setInfoOrder] = useState([])
    const id = useParams();
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();
    const [role, setRole] = useState();
    const [isReturn, setIsReturn] = useState(false)
    useEffect(()=> {axios.post("/api/confirmPriceSchedule/loadRole", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
       setRole(response.data.role)
       
    }).catch((error) => { });}, [])

    useEffect(()=> {    
        axios.post("/api/confirmPriceSchedule/getCSP", {order_id: id}).
    then((response) => {
       if (response.data.length !== 0) {
            setDateTime(response.data[0].time_schedule);
            setPrice(response.data[0].price);
            handleTime(response.data[0].time_schedule);
       }
    }).catch((error) => { });}, [])
    useEffect(()=> {    
        axios.post("/api/confirmPriceSchedule/getInfoOrder", {order_id: id}).
    then((response) => {
       setInfoOrder(response.data);
       setIsReturn(true);
    }).catch((error) => { });}, [])
    
    
    const [open, setOpen] = useState(false);
    const [datetime, setDateTime] = useState("");
    const [price, setPrice] = useState(0);
    const handleClickToOpen = (e) => {
        e.preventDefault()
        setOpen(true);
        axios.post("/api/confirmPriceSchedule/setCSP", {id, datetime, price}).
        then((response) => {
        }).catch((error) => { });
    };
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    const handleToClose = () => {
        setOpen(false);
    };
    const [time, setTime] = useState("");
    const [day, setDay] = useState("")
    const handleTime = (date_time) => {
        const datetime = new Date(date_time);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const date = datetime.toLocaleDateString(undefined, dateOptions);
        const time_ = datetime.toLocaleTimeString(undefined, timeOptions);
        setTime(time_)
        setDay(date)
    }
    
    

    
    if (isReturn && role === "provider") {
        return (
            <div className="background-white">
                <div style={{fontSize:"30px"}}>Gửi yêu cầu xác nhận giá sửa chữa và lịch sửa chữa</div>
                <div className="user-info-area">
                <div className="user-info">
                        <div>Khách hàng: {info_order[0].customer_name}</div>
                        <div>Yêu cầu sửa: {info_order[0].item_type}</div>
                        <div>Địa chỉ: {info_order[0].street} {info_order[0].town} {info_order[0].district} {info_order[0].province}</div>
                        <div>Số điện thoại: {info_order[0].customer_phone_number}</div>
                       
                    </div>
                    <div className="user-info">
                        <div>Thợ sửa: {info_order[0].provider_name}</div>
                        <div>Mã đơn hàng: {info_order[0].order_id}</div>
                        <div>Số điện thoại: {info_order[0].provider_phone_number}</div>
                    </div>
                </div>
                <div className="communicate-area">
                    <div className="communicate-note">
                    Trước khi thực hiện các thao tác xác nhận/ gửi yêu cầu xác nhận, 
                    khách hàng và nhân viên có thể thực hiện trao đổi thông tin thông 
                    qua cuộc gọi điện thoại qua số điện thoại được cung cấp phía trên 
                    hoặc qua room chat bằng cách bấm nút “Trò chuyện”.
                    </div>
                    <a className= "communicate-btn" href="/chat" target="_blank" >
                        <button type="submit">Trò chuyện</button>
                    </a>
                </div>
                <form className="form-confirm" onSubmit={handleChange}>
                    <div>Lịch sửa chữa:</div>
                    <div className = "form-confirm-date-time">
                        <label>Thời gian</label>
                        <input type = "datetime-local" className="input-order-info" name="Giờ" onChange = {(e) => setDateTime(e.target.value)}/>
                    </div>
                    <div className = "form-confirm-price">
                        <label>Giá đề xuất</label>
                        <input type = "number" className="input-order-info" name="Chi phí" onChange = {(e) => setPrice(e.target.value)}/>
                        <label>VND</label>
                    </div>
                    <div className="submit-area">
                    Gửi yêu cầu xác nhận xác nhận thông tin đơn hàng
                    <button type="submit"  onClick={handleClickToOpen} > Gửi</button>
                    </div>
                </form>
                <div>
                <Modal
                open={open}
                onClose={handleToClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 600,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Gửi yêu cầu xác nhận thành công!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>Khách hàng sẽ sớm nhận được thông báo. </p>
                    <p>Chờ thông báo đồng ý từ khách hàng để dịch vụ sửa chữa hiệu lực!</p>
                    </Typography>
                </Box>
                </Modal>
                
                   
                </div>
            </div>
        )
    }
    else if (isReturn && role === "customer") {
        return (
            <div className="background-white">
                <div style={{fontSize:"30px"}}>Xác nhận giá sửa chữa và lịch sửa chữa</div>
                <div className="user-info-area">
                <div className="user-info">
                        <div>Khách hàng: {info_order[0].customer_name}</div>
                        <div>Yêu cầu sửa: {info_order[0].item_type}</div>
                        <div>Địa chỉ: {info_order[0].street} {info_order[0].town} {info_order[0].district} {info_order[0].province}</div>
                        <div>Số điện thoại: {info_order[0].customer_phone_number}</div>
                       
                    </div>
                    <div className="user-info">
                        <div>Thợ sửa: {info_order[0].provider_name}</div>
                        <div>Mã đơn hàng: {info_order[0].order_id}</div>
                        <div>Số điện thoại: {info_order[0].provider_phone_number}</div>
                    </div>
                </div>
                <div className="communicate-area">
                    <div className="communicate-note">
                    Trước khi thực hiện các thao tác xác nhận/ gửi yêu cầu xác nhận, 
                    khách hàng và nhân viên có thể thực hiện trao đổi thông tin thông 
                    qua cuộc gọi điện thoại qua số điện thoại được cung cấp phía trên 
                    hoặc qua room chat bằng cách bấm nút “Trò chuyện”.
                    </div>
                    <a className= "communicate-btn" href="/chat">
                        <button type="submit">Trò chuyện</button>
                    </a>
                </div>
                <div className="form-confirm">
                    <div>Lịch sửa chữa:</div>
                    <div className = "form-confirm-date-time">
                        <label>Thời gian</label>
                        <div type = "datetime-local" className="input-order-info" name="Giờ"> {time} {day} </div>
                    </div>
                    <div className = "form-confirm-price">
                        <label>Giá đề xuất</label>
                        <div type = "number" className="input-order-info" name="Chi phí"> {price} </div>
                        <label>VND</label>
                    </div>
                    <div className="submit-area">
                    Xác nhận thông tin đơn hàng
                    <button type="submit" onClick={handleClickToOpen}> Xác nhận</button>
                    </div>
                </div>
                <Modal
                open={open}
                onClose={handleToClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 600,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Xác nhận thành công!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Nhân viên sửa chữa sẽ sớm thực hiện đơn hàng theo lịch đã xác nhận!
                    </Typography>
                </Box>
                </Modal>
                
            </div>
            
        )
    }
    else return (<></>)
}
export default Confirm;

