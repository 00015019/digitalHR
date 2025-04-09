import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Radio,
} from "antd";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

function AddEmployee() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          New Employee
        </h1>
      </div>
      <Form layout="vertical" className="grid grid-cols-3 gap-x-8">
        <Form.Item className="col-span-3">
          <div className="relative w-[90px] h-[90px] flex items-center justify-center bg-[#EEF0F4] rounded-full border border-[#C2C4CA]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaRegUser className="text-[36px] text-gray-500" />
            )}
            <button
              type="button"
              className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center"
              onClick={() => fileInputRef.current.click()}
            >
              <HiOutlinePencilAlt className="text-[18px] text-blue-500" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </div>
        </Form.Item>

        <Form.Item label="First Name">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Phone">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Email">
          <Input size="large" type="email" />
        </Form.Item>
        <Form.Item label="Address">
          <TextArea size="large" rows={2} />
        </Form.Item>
        <Form.Item label="Job Title">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Department">
          <Select size="large" className="w-full">
            <Select.Option value="engineering">Engineering</Select.Option>
            <Select.Option value="hr">Human Resources</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Joined Date">
          <DatePicker size="large" className="w-full" />
        </Form.Item>
        <Form.Item label="Salary">
          <InputNumber size="large" className="w-full" />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker size="large" className="w-full" />
        </Form.Item>
        <Form.Item label="Employment Type">
          <Select size="large" className="w-full">
            <Select.Option value="full-time">Full-Time</Select.Option>
            <Select.Option value="part-time">Part-Time</Select.Option>
            <Select.Option value="contract">Contract</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Emergency Contact">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Notes" className="col-span-3">
          <TextArea size="large" rows={4} />
        </Form.Item>
        <Form.Item className="col-span-3 flex justify-end">
          <Button type="primary" size="large" className="w-[200px]">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEmployee;
