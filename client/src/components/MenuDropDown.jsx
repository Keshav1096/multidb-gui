import { Menu } from "antd";
import { SiMongodb } from "react-icons/si";
import { CgDatabase } from "react-icons/cg";
import { VscDebugDisconnect } from "react-icons/vsc";
import { getCollections } from "../services/api";
import AsyncModal from "../components/AsyncModal";
import { useState } from "react";

const { SubMenu } = Menu;

export default function MenuDropDown({ list, dbs, updateDb }) {
  const [openKeys, setOpenKeys] = useState([]);
  const [renderModal, setRenderModal] = useState(false);

  async function handleOnClick(event) {
    let coll = await getCollections(event.key);
    console.log(coll);
    updateDb({ coll, sessionId: event.key });
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      {list.map((item) => (
        <SubMenu
          key={item.sessionId}
          title={item.uri.slice(10)}
          icon={<SiMongodb />}
        >
          {dbs[item.sessionId].map((db) => (
            <Menu.Item
              key={item.sessionId.toString() + ":" + db.name}
              icon={<CgDatabase />}
              onClick={handleOnClick}
            >
              {db.name}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
      <Menu.Item
        icon={<VscDebugDisconnect />}
        onClick={() => {
          setRenderModal(true);
        }}
      >
        New Connection
      </Menu.Item>
      <AsyncModal
        toggleVisible={renderModal}
        disableModal={(value) => {
          setRenderModal(value);
        }}
      />
    </Menu>
  );
}
