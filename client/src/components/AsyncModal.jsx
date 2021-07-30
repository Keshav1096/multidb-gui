import { Input, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { addNewConnection } from "../services/api";

export default function AsyncModal({ toggleVisible, disableModal }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputText, setInputText] = useState("mongodb://");
  useEffect(() => {
    setVisible(toggleVisible);
  }, [toggleVisible]);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await addNewConnection(inputText).catch((err) => {
      return err;
    });

    setTimeout(() => {
      // setVisible(false);
      disableModal(false);
      setConfirmLoading(false);
      window.location.reload(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setVisible(false);
    disableModal(false);
  };

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <Modal
        title="Add a new connection"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
          <Input
            placeholder="enter mongo uri"
            onChange={handleOnChange}
            value={inputText}
          />
        </p>
      </Modal>
    </div>
  );
}
