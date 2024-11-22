import { Col, Form, message, Modal, Input, Row } from "antd";
import axios from "../helpers/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) => {
  // Agar modal dikhana hai to `showBusForm` true hona chahiye
  if (!showBusForm) return null;
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      let response = null; // Response ko initialize kiya
      dispatch(ShowLoading());

      // Agar bus add karni ho toh
      if (type === "add") {
        response = await axios.post("/buses/add-bus", values); // Add bus API call
      } else {
        // Agar bus update karni ho toh
        response = await axios.post("/buses/update-bus", {
          ...values, // Form ke values ko include kiya
          _id: selectedBus._id, // Update ke liye selected bus ka id bhejna zaroori hai
        });
      }

      // Agar API call successful ho
      if (response.data.success) {
        message.success(response.data.message); // Success message dikhaya
      } else {
        message.error(response.data.message);
      }

      dispatch(HideLoading());
      getData(); // Table ya list ko refresh karne ke liye data ko dobara fetch kiya
      setShowBusForm(false); // Form ko band kar diya
      setSelectedBus(null); // Selected bus ko null kar diya
    } catch (error) {
      message.error(error.message); // Catch block me agar koi error aaye toh error message dikhaya
      dispatch(HideLoading()); // Loading spinner hata diya
    }
  };

  return (
    <div className='fixed overflow-auto inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      {/* Modal Box */}
      <Form onFinish={onFinish} initialValues={selectedBus}>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl'>
          {/* Modal Header */}
          <div className='flex justify-between items-center border-b pb-4'>
            <h2 className='text-xl font-semibold'>
              {type === "add" ? "Add Bus" : "Update Bus"}
            </h2>

            <button
              onCancel={() => {
                setSelectedBus(null);
                setShowBusForm(false);
              }} // Modal close karne ke liye
              className='text-gray-500 hover:text-red-500'
            >
              <i className='ri-close-line text-2xl'></i>
            </button>
          </div>

          {/* Modal Content */}
          <div className='mt-4'>
            {/* Bus form fields  */}

            <Row gutter={[10, 10]}>
              <Col lg={24} xs={24}>
                <Form.Item label='Bus Name' name='name'>
                  <Input type='text' />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item label='Bus Number' name='number'>
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col lg={12} xs={24}>
                <Form.Item label='Capacity' name='capacity'>
                  <Input type='text' />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item label='From' name='from'>
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col lg={12} xs={24}>
                <Form.Item label='To' name='to'>
                  <Input type='text' />
                </Form.Item>
              </Col>

              <Col lg={8} xs={24}>
                <Form.Item label='Journey Date' name='journeyDate'>
                  <Input type='date' />
                </Form.Item>
              </Col>
              <Col lg={8} xs={24}>
                <Form.Item label='Departure' name='departure'>
                  <Input type='time' />
                </Form.Item>
              </Col>
              <Col lg={8} xs={24}>
                <Form.Item label='Arrival' name='arrival'>
                  <Input type='time' />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item label='Type' name='type'>
                  <select className='border px-2 py-1 ' name='' id=''>
                    <option value='AC'>AC</option>
                    <option value='Non-AC'>NON-AC</option>
                  </select>
                </Form.Item>
              </Col>
              <Col lg={12} xs={24}>
                <Form.Item label='Fare' name='fare'>
                  <Input type='text' />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item label='Status' name='status'>
                  <select className='border px-2 py-1 ' name='' id=''>
                    <option value='Yet To Start'>Yet To Start</option>
                    <option value='Running'>Running</option>
                    <option value='Completed'>Completed</option>
                  </select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Modal Footer Buttons */}
          <div className='flex justify-end gap-4 mt-6'>
            <button
              onClick={() => setShowBusForm(false)} // Cancel button
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              type='submit' // Add Bus button
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BusForm;
