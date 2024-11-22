import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";
import axiosInstance from "../helpers/axios";
import { message, Col, Row } from "antd";
import Bus from "../components/Bus";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);

  const dispatch = useDispatch();

  // Get all buses
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/buses/get-all-buses", {});
      dispatch(HideLoading());

      if (response.data.success) {
        setBuses(response.data.data);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className=''></div>
      <div className=''>
        <Row>
          <Col lg={12} xs={24} sm={24}>
            {buses.map((bus, index) => (
              <Bus key={index} bus={bus} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
