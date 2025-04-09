import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";

const LogOutModal = ({ open, close }) => {
  const navigate = useNavigate();
  const LogOut = () => {
    Cookies.remove("access_token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <Modal
        title="LogOutTitle"
        open={open}
        onCancel={close}
        footer={false}
        centered
        width={350}
      >
        <div className="flex items-center gap-3 mt-8 justify-end">
          <Button onClick={close} size="large">
            No
          </Button>
          <Button onClick={LogOut} size="large" type="primary">
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default LogOutModal;
