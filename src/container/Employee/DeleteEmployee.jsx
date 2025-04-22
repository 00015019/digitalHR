import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNotification } from "../../components/ui/Notification";
import request from "../../components/config";

const DeleteEmployee = ({ isOpen, handleClose, id, onDeleteSuccess }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { openNotification } = useNotification();

  const handleDelete = async () => {
    setButtonLoading(true);
    try {
      await request.delete(`/user/user/${id}/delete/`);
      openNotification("success", "delete_success");
      onDeleteSuccess(id);
      close();
    } catch (err) {
      console.error(err);
      openNotification("error", "errorMsg");
    } finally {
      setButtonLoading(false);
    }
  };

  console.log(id);
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        centered
        footer={false}
        width={400}
      >
        <p className="text-lg mb-5">Employee deleted successfully</p>
        <div className="flex items-center gap-3 justify-end">
          <Button size="large" onClick={handleClose}>
            No
          </Button>
          <Button
            loading={buttonLoading}
            size="large"
            onClick={handleDelete}
            type="primary"
          >
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEmployee;
