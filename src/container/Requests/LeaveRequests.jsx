import React, { useState } from "react";
import { Card, Tag, Modal, Button, Dropdown, Menu } from "antd";

const initialRequests = [
  {
    id: 1,
    employee: "John Doe",
    reason: "Family emergency",
    fullReason:
      "I need to take leave due to a family emergency. I will return to work as soon as possible and ensure that my tasks are covered in my absence.",

    fromDate: "2025-03-10",
    toDate: "2025-03-12",
    status: "Pending",
    createdAt: "2025-03-07",
  },
  {
    id: 2,
    employee: "Alice Johnson",
    reason: "Medical leave",
    fullReason:
      "I am requesting medical leave for a scheduled surgery and recovery period. I have attached the necessary documents for verification.",
    fromDate: "2025-03-15",
    toDate: "2025-03-18",
    status: "Approved",
    createdAt: "2025-03-05",
  },
];

const statusOptions = ["Pending", "Approved", "Rejected"];

const LeaveRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    setSelectedRequest(null); // Close modal after updating
  };

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Leave Requests
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {requests.map((request) => (
          <Card
            key={request.id}
            title={request.employee}
            className="shadow-lg cursor-pointer"
            onClick={() => setSelectedRequest(request)}
          >
            <p className="text-sm text-gray-600">{request.reason}</p>
            <div className="mt-2 flex justify-between">
              <Tag
                color={
                  request.status === "Pending"
                    ? "orange"
                    : request.status === "Approved"
                    ? "green"
                    : "red"
                }
              >
                {request.status}
              </Tag>
              <span className="text-gray-500 text-sm">{request.createdAt}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Leave Request Modal */}
      <Modal
        open={!!selectedRequest}
        onCancel={() => setSelectedRequest(null)}
        footer={null}
      >
        {selectedRequest && (
          <div>
            <h1 className="font-bold text-[20px] text-center">
              Request details
            </h1>
            <div className=" font-semibold text-[15px] text-primary mb-2">
              <p className="underline">{selectedRequest.employee}</p>
            </div>

            <p className="italic font-[14px] mb-4">
              {selectedRequest.fullReason}
            </p>
            <div className="flex gap-4 mb-2 font-semibold text-gray-500">
              <p>
                <strong>From:</strong> {selectedRequest.fromDate}
              </p>
              <p>
                <strong>To:</strong> {selectedRequest.toDate}
              </p>
            </div>
            <p className="">
              <strong>Status:</strong> {selectedRequest.status}
            </p>

            <Dropdown
              overlay={
                <Menu>
                  {statusOptions.map((status) => (
                    <Menu.Item
                      key={status}
                      onClick={() =>
                        handleStatusChange(selectedRequest.id, status)
                      }
                    >
                      {status}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button className="mt-3 bg-primary text-white">
                Change Status
              </Button>
            </Dropdown>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveRequests;
