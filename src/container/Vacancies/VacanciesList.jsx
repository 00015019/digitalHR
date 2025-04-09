import React, { useState } from "react";
import {
  Card,
  Modal,
  Button,
  Tag,
  Input,
  Select,
  Form,
  DatePicker,
  Switch,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";

const { Meta } = Card;
const { Option } = Select;

const VacancyAdvertisements = () => {
  const [filter, setFilter] = useState({
    search: "",
    department: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [vacancies, setVacancies] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      description: "Looking for a skilled React developer.",
      platforms: ["LinkedIn", "Headhunter"],
      postedDate: "2025-03-05",
      fullDescription:
        "We are looking for an experienced React developer to join our team and build scalable applications.",
      status: "Closed",
      department: "IT",
    },
    {
      id: 2,
      title: "HR Manager",
      description: "Experienced HR specialist needed.",
      platforms: ["LinkedIn", "Indeed"],
      postedDate: "2025-02-20",
      fullDescription:
        "We need an HR Manager with experience in recruitment and employee management.",
      status: "Closed",
      department: "HR",
    },
    {
      id: 3,
      title: "Frontend Developer",
      description: "Looking for a skilled React developer.",
      platforms: ["LinkedIn", "Headhunter"],
      postedDate: "2025-03-05",
      fullDescription:
        "We are looking for an experienced React developer to join our team and build scalable applications.",
      status: "Closed",
      department: "IT",
    },
    {
      id: 4,
      title: "HR Manager",
      description: "Experienced HR specialist needed.",
      platforms: ["LinkedIn", "Indeed"],
      postedDate: "2025-02-20",
      fullDescription:
        "We need an HR Manager with experience in recruitment and employee management.",
      status: "Closed",
      department: "HR",
    },
    {
      id: 5,
      title: "Frontend Developer",
      description: "Looking for a skilled React developer.",
      platforms: ["LinkedIn", "Headhunter"],
      postedDate: "2025-03-05",
      fullDescription:
        "We are looking for an experienced React developer to join our team and build scalable applications.",
      status: "Closed",
      department: "IT",
    },
    {
      id: 6,
      title: "HR Manager",
      description: "Experienced HR specialist needed.",
      platforms: ["LinkedIn", "Indeed"],
      postedDate: "2025-02-20",
      fullDescription:
        "We need an HR Manager with experience in recruitment and employee management.",
      status: "Active",
      department: "HR",
    },
    {
      id: 7,
      title: "Frontend Developer",
      description: "Looking for a skilled React developer.",
      platforms: ["LinkedIn", "Headhunter"],
      postedDate: "2025-03-05",
      fullDescription:
        "We are looking for an experienced React developer to join our team and build scalable applications.",
      status: "Active",
      department: "IT",
    },
    {
      id: 8,
      title: "HR Manager",
      description: "Experienced HR specialist needed.",
      platforms: ["LinkedIn", "Indeed"],
      postedDate: "2025-02-20",
      fullDescription:
        "We need an HR Manager with experience in recruitment and employee management.",
      status: "Active",
      department: "HR",
    },
  ]);

  const handleCardClick = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditVacancy = () => {
    setIsEditMode(true);
  };

  const handleSaveVacancy = (values) => {
    setVacancies((prev) =>
      prev.map((vac) =>
        vac.id === selectedVacancy.id ? { ...selectedVacancy, ...values } : vac
      )
    );
    setIsModalOpen(false);
  };

  const handleAddVacancy = (values) => {
    const newVacancy = {
      id: vacancies.length + 1,
      ...values,
      postedDate: values.postedDate.format("YYYY-MM-DD"),
      status: values.status ? "Active" : "Closed",
    };
    setVacancies((prev) => [...prev, newVacancy]);
    setIsAddModalOpen(false);
  };

  const filteredVacancies = vacancies.filter((emp) => {
    return (
      emp.title.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.department ? emp.department === filter.department : true) &&
      (filter.status ? emp.status === filter.status : true)
    );
  });

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Vacancy Advertisements
        </h1>

        <Button
          type="primary"
          size="large"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center shadow-lg shadow-primary/15 gap-2 h-10 md:h-12 px-4 font-semibold text-white bg-primary rounded-[14px] hover:bg-primary/85 duration-200"
        >
          <FaPlus size={18} />
          <span className="text-[14px] md:text-[16px]">Add Vacancy</span>
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Search
          placeholder="Search job title"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          style={{ width: 200 }}
        />
        <Select
          placeholder="All vacancies"
          onChange={(value) => setFilter({ ...filter, department: value })}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="All">All vacancies</Option>
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVacancies.map((vacancy) => (
          <Card
            key={vacancy.id}
            hoverable
            title={vacancy.title}
            extra={<span>{vacancy.postedDate}</span>}
            onClick={() => handleCardClick(vacancy)}
          >
            <Meta description={vacancy.description} />
            <div className="mt-2">
              {vacancy.platforms.map((platform, index) => (
                <Tag color="blue" key={index}>
                  {platform}
                </Tag>
              ))}
            </div>
            <Tag
              color={vacancy.status === "Active" ? "green" : "red"}
              className="mt-2"
            >
              {vacancy.status}
            </Tag>
          </Card>
        ))}
      </div>

      <Modal
        title={selectedVacancy?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {isEditMode ? (
          <Form
            onFinish={handleSaveVacancy}
            initialValues={selectedVacancy}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Job Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Short Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="fullDescription"
              label="Full Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="platforms" label="Platforms">
              <Select mode="multiple" placeholder="Select platforms">
                <Option value="LinkedIn">LinkedIn</Option>
                <Option value="Headhunter">Headhunter</Option>
                <Option value="Indeed">Indeed</Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Closed" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        ) : (
          <>
            <p>{selectedVacancy?.fullDescription}</p>
            {selectedVacancy?.platforms.map((platform, index) => (
              <Tag color="blue" key={index}>
                {platform}
              </Tag>
            ))}
            <div className="mt-4">
              <Tag
                color={selectedVacancy?.status === "Active" ? "green" : "red"}
              >
                {selectedVacancy?.status}
              </Tag>
            </div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditVacancy}
              className="mt-4"
            >
              Edit
            </Button>
          </>
        )}
      </Modal>

      <Modal
        title="Add New Vacancy"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleAddVacancy} layout="vertical">
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Short Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="fullDescription"
            label="Full Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="platforms" label="Platforms">
            <Select mode="multiple" placeholder="Select platforms">
              <Option value="LinkedIn">LinkedIn</Option>
              <Option value="Headhunter">Headhunter</Option>
              <Option value="Indeed">Indeed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="postedDate"
            label="Posted Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Closed" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Vacancy
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default VacancyAdvertisements;
