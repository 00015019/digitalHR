// EditEmployee.jsx
import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import request from "../../components/config";
import dayjs from "dayjs";

const { TextArea } = Input;

function EditEmployee() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const res = await request.get(`/user/department/list/`);
      setDepartments(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployee = async () => {
    try {
      const res = await request.get(`/user/user/${id}`);
      const data = res?.data;
      form.setFieldsValue({
        ...data,
        department: String(data.department),
        joined_date: data.joined_date ? dayjs(data.joined_date) : null,
        date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
      });
      if (data.profile_image) {
        setImageUrl(data.profile_image);
      }
    } catch (err) {
      console.error("Failed to fetch employee:", err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (values.first_name) formData.append("first_name", values.first_name);
      if (values.last_name) formData.append("last_name", values.last_name);
      if (values.phone) formData.append("phone", values.phone);
      if (values.email) formData.append("email", values.email);
      if (values.address) formData.append("address", values.address);
      if (values.job_title) formData.append("job_title", values.job_title);
      if (values.department) formData.append("department", values.department);
      if (values.salary) formData.append("salary", values.salary);
      if (values.gender) formData.append("gender", values.gender);
      if (values.employment_type)
        formData.append("employment_type", values.employment_type);
      if (values.contact) formData.append("contact", values.contact);
      if (values.note) formData.append("note", values.note);

      if (values.joined_date) {
        formData.append(
          "joined_date",
          dayjs(values.joined_date).format("YYYY-MM-DD")
        );
      }
      if (values.date_of_birth) {
        formData.append(
          "date_of_birth",
          dayjs(values.date_of_birth).format("YYYY-MM-DD")
        );
      }
      if (imageFile instanceof File) {
        formData.append("profile_image", imageFile);
      }

      const response = await request.put(`/user/user/${id}/update/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Updated:", response.data);
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  useEffect(() => {
    getDepartments();
    getEmployee();
  }, []);

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          New Employee
        </h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-3 gap-x-8"
        onFinish={handleSubmit}
      >
        <Form.Item name="profile_image" className="col-span-3">
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
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImageUrl(reader.result);
                  reader.readAsDataURL(file);
                  setImageFile(file);
                }
              }}
              style={{ display: "none" }}
            />
          </div>
        </Form.Item>

        <Form.Item name="first_name" label="First Name">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input size="large" type="email" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <TextArea size="large" rows={2} />
        </Form.Item>
        <Form.Item name="job_title" label="Job Title">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="department" label="Department">
          <Select size="large" className="w-full">
            {departments?.map((department) => (
              <Select.Option key={department.id} value={`${department.id}`}>
                {department.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="joined_date" label="Joined Date">
          <DatePicker size="large" className="w-full" />
        </Form.Item>
        <Form.Item name="salary" label="Salary">
          <InputNumber size="large" className="w-full" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="date_of_birth" label="Date of Birth">
          <DatePicker size="large" className="w-full" />
        </Form.Item>
        <Form.Item name="employment_type" label="Employment Type">
          <Select size="large" className="w-full">
            <Select.Option value="full_time">Full-Time</Select.Option>
            <Select.Option value="part_time">Part-Time</Select.Option>
            <Select.Option value="contract">Contract</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="contact" label="Emergency Contact">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="note" label="Notes" className="col-span-3">
          <TextArea size="large" rows={4} />
        </Form.Item>
        <Form.Item className="col-span-3 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-[200px]"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditEmployee;
