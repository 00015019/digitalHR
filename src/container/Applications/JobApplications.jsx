import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Select, Modal, Input, Badge, Card, Dropdown, Menu } from "antd";

const { Option } = Select;
const { Search } = Input;

const jobVacancies = [
  { id: 1, title: "Software Engineer" },
  { id: 2, title: "Product Manager" },
  { id: 3, title: "UI/UX Designer" },
];

const applications = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "Frontend Developer",
    contact: "johndoe@email.com",
    appliedFrom: "LinkedIn",
    date: "2025-03-07",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    jobTitle: "UI/UX Designer",
    contact: "janesmith@email.com",
    appliedFrom: "Headhunter",
    date: "2025-03-06",
    status: "Reviewed",
  },
];

const statusOptions = ["Pending", "Reviewed", "Accepted", "Rejected"];

const JobApplications = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [modalData, setModalData] = useState(null);
  const [appList, setAppList] = useState(applications);

  const handleVacancyChange = (value) => setSelectedVacancy(value);
  const handleSearch = (value) => setSearchTerm(value.toLowerCase());
  const openModal = (record) => setModalData(record);
  const closeModal = () => setModalData(null);

  const filteredApplications = appList.filter(
    (app) =>
      (!selectedVacancy || app.vacancyId === selectedVacancy) &&
      (selectedStatus === "All" || app.status === selectedStatus) &&
      app.name.toLowerCase().includes(searchTerm)
  );

  const handleStatusChange = (id, newStatus) => {
    setAppList((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Job applications
        </h1>
      </div>
      <div className="flex gap-4 mb-4">
        <Select
          placeholder="Select Vacancy"
          onChange={handleVacancyChange}
          className="w-1/3"
          allowClear
        >
          {jobVacancies.map((vac) => (
            <Option key={vac.id} value={vac.id}>
              {vac.title}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue="All"
          onChange={setSelectedStatus}
          className="w-1/4"
        >
          <Option value="All">All</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Reviewed">Reviewed</Option>
          <Option value="Accepted">Accepted</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
        <Search
          placeholder="Search Applicant"
          onSearch={handleSearch}
          className="w-1/3"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredApplications.map((app) => (
          <Card
            key={app.id}
            title={app.name}
            className="shadow-lg cursor-pointer"
            onClick={() => openModal(app)} // 🛠️ Now clicking opens the modal
          >
            <p>
              <strong>Position:</strong> {app.jobTitle}
            </p>
            <p>
              <strong>Contact:</strong> {app.contact}
            </p>
            <p>
              <strong>Applied From:</strong> {app.appliedFrom}
            </p>
            <p>
              <strong>Date:</strong> {app.date}
            </p>
            <Dropdown
              overlay={
                <Menu>
                  {statusOptions.map((status) => (
                    <Menu.Item
                      key={status}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents modal from opening
                        handleStatusChange(app.id, status);
                      }}
                    >
                      {status}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <Badge
                count={app.status}
                style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
                className="mt-2 inline-block"
                onClick={(e) => e.stopPropagation()} // Stops click event from triggering modal
              >
                <DownOutlined className="ml-2" />
              </Badge>
            </Dropdown>
          </Card>
        ))}
      </div>
      <Modal
        title="Application Details"
        open={!!modalData}
        onCancel={closeModal}
        footer={null}
      >
        {modalData && (
          <div>
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Contact:</strong> {modalData.contact}
            </p>
            <p>
              <strong>Applied From:</strong> {modalData.appliedFrom}
            </p>
            <p>
              <strong>Date:</strong> {modalData.date}
            </p>
            <p>
              <strong>Status:</strong> {modalData.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobApplications;
