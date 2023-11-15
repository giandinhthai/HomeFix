import React, { useState } from "react";
import "../styles/SendInformation.css";
import { ItemTypeForm } from "../components/ItemTypeForm";
import { SpecificItemForm } from "../components/SpecificItemForm";
import { DescriptionForm } from "../components/DescriptionForm";
import dayjs from "dayjs";
import { MeetingTimeSchedule } from "../components/MeetingTimeScheduleForm";
// import { ProviderForm } from "../components/ProviderForm";
// import {ItemTypeForm,SpecificItemForm} from "../components";

const InformationForm = () => {
  const [formData, setFormData] = useState({
    itemType: "",
    specificItem: "",
    textDescription: "",
    imageDescription: null,
    position: "",
    meetingTimeSchedule: [dayjs("2022-04-17T15:30"), dayjs("2022-04-21T18:30")],
    provider: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleMeetingTimeSchedule = (name, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend server here
  };

  return (
    // <div className="container mt-5 p-5 border border-2 rounded-0">
    //   <div className="row">
    //     <div className="col-8 offset-2">
    //       <div className="mb-3">
    //         <label for="basic-url" className="form-label">
    //           Loại vật dụng:
    //         </label>
    //         <div className="input-group">
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="basic-url"
    //             aria-describedby="basic-addon3 basic-addon4"
    //           />
    //         </div>
    //         <div className="form-text" id="basic-addon4">
    //           Example help text goes outside the input group.
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //--------------------------
    <div className="form-container">
      <h2 className="form-name">Phiếu yêu cầu sửa chữa</h2>
      <form onSubmit={handleSubmit}>
        <ItemTypeForm formData={formData} handleChange={handleChange} />
        <SpecificItemForm formData={formData} handleChange={handleChange} />
        <DescriptionForm formData={formData} handleChange={handleChange} />
        <div className="image-button-container">
          <input
            name="imageDescription"
            onChange={handleChange}
            type="file"
            multiple
          />
        </div>
        <div className="form-group">
          <label>
            Vị trí
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="vị trí"
            />
          </label>
        </div>
        <MeetingTimeSchedule
          formData={formData}
          handleChange={handleMeetingTimeSchedule}
        />
        {/* <ProviderForm formData={formData} handleChange={handleChange} /> */}
        <div className="submit-button-container">
          <button type="submit">Xác nhận</button>
        </div>
      </form>
    </div>
  );
};

export default InformationForm;
