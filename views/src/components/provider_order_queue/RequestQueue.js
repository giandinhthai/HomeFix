import React from 'react';
import { useState, useEffect } from 'react';
import "./RequestQueue.css";
import { Link } from 'react-router-dom';
import axios from 'axios'
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import providerAvt from './provider_avt.jpg';
const cookies = new Cookies();

const token = cookies.get('TOKEN');
const ModalNoti = ({ isModalOpen, closeModal, message,selectedOrder, cancelOrder }) => {
  return (
    <Modal 
      className={"popup-confirm-config"} 
      overlayClassName={"cfm-config-ctn"}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <p>{message}</p>
      <div className='btn-ctn-cfm-cfg'>
        <button onClick={closeModal} className="cfm-config-btn">Đóng</button>
        <button onClick={() => { closeModal(); cancelOrder(selectedOrder.order_id); }} className="cfm-config-btn">Xác nhận</button>
      </div>
    </Modal>
  );
};
const ModalActionNoti = ({ isModalOpen, closeModal, message,selectedOrder, action }) => {
  return (
    <Modal 
      className={"popup-confirm-config"} 
      overlayClassName={"cfm-config-ctn"}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <p>{message}</p>
      <div className='btn-ctn-cfm-cfg'>
        <button onClick={closeModal} className="cfm-config-btn">Đóng</button>
        <button onClick={() => { closeModal(); action(selectedOrder.order_id); }} className="cfm-config-btn">Xác nhận</button>
      </div>
    </Modal>
  );
};
function RequestQueue() {
  const [isLoading, setLoading] = useState(true);
  const [serviceOrderList, setServiceOrderList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedOrder,setSelectedOrder]=useState();
  useEffect(() => {
    axios
      .post('/api/orderQueue/provider/getAllOrder', {
        // customerId:3,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setErrorMessage('');
        setServiceOrderList(response.data.allOrder);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
        setLoading(false);
      });
  }, [isLoading]);
  const [isModalCancelOrder,setModalCancelOrder]=useState(false);
  const handleCancelOrder=()=>{
    setModalCancelOrder(true);
  }
  const cancelOrder=(order_id)=>{
    axios
      .post('/api/orderQueue/provider/cancelOrder', {
        order_id:order_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setErrorMessage('');
        setLoading(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
        setLoading(true);
      });
  }
  const [isModalAcceptOrder,setModalAcceptOrder]=useState(false);
  const handleAcceptOrder=()=>{
    setModalAcceptOrder(true);
  }
  const acceptOrder=(order_id)=>{
    axios
      .post('/api/orderQueue/provider/acceptOrder', {
        order_id:order_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setErrorMessage('');
        setLoading(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
        setLoading(true);
      });
  }
  const serviceOrderSingleQueue = (requestData) => (
      <div className='request-container-ctmq'>
        <div className='avt-request-queue'>
          <img src={providerAvt} alt='Provider Avatar' />
        </div>
        <div key={requestData.order_id} className='txt-request-ctn-ctmq'>
          <p className='request-id'>Phiếu yêu cầu số {requestData.order_id}</p>
          <p className='specific-item-info'>Yêu cầu sửa: {requestData.specific_item}</p>
          <p className={`request-status ${requestData.status}`}>Trạng thái: {requestData.status}</p>
          <div className='btn-ctn-ctmq'>
          {requestData.status==='Đang xác nhận' && (
            <>
            <button onClick={() => { setSelectedOrder(requestData); handleCancelOrder(); }}>
              Từ chối
            </button>
            <button onClick={() => { setSelectedOrder(requestData); handleAcceptOrder(); }}>
              Chấp nhận
            </button>
            </>
          )}
            <Link to={`details/${requestData.order_id}`}>
              <button>Chi tiết</button>
            </Link>
          </div>
        </div>
        <ModalNoti 
        isModalOpen={isModalCancelOrder} 
        closeModal={()=>setModalCancelOrder(false)}
        message={'Bạn chắc chắn muốn hủy yêu cầu này'}
        selectedOrder={selectedOrder}
        cancelOrder={cancelOrder}
        />
        <ModalActionNoti 
        isModalOpen={isModalAcceptOrder} 
        closeModal={()=>setModalAcceptOrder(false)}
        message={'Bạn chắc chắn muốn chấp nhận yêu cầu này'}
        selectedOrder={selectedOrder}
        action={acceptOrder}
        />
      </div>
  );
  
  const allRequestDataItems = serviceOrderList.map((requestData) => (
    <React.Fragment key={requestData.order_id}>
      {serviceOrderSingleQueue(requestData)}
    </React.Fragment>
  ));
  if (isLoading) {
    return <div className='App'>Loading...</div>;
  }
  if(errorMessage){
    return <div className='App'>{errorMessage}</div>;
  }
  return (
    <div>
    <div className='allRequest-container'>
        <h2>DANH SÁCH YÊU CẦU SỬA CHỮA</h2>
        {allRequestDataItems}
    </div>
    </div>
  )
}

export default RequestQueue;
export {ModalActionNoti}