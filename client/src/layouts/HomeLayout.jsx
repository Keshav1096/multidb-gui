import { Layout } from "antd";
import { useState } from "react";
import SideBar from "./SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Databases from "./Databases";
import Connection from "./Connection";
import SearchBox from "../components/SearchBox";

const { Content, Footer, Sider } = Layout;

export default function HomeLayout({ component: Component }) {
  const [collapsed, setCollapsed] = useState(false);
  const [collections, setCollections] = useState({});
  const onCollapse = (data) => {
    console.log(data);
    setCollapsed(data);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsed={collapsed} onCollapse={onCollapse} collapsible>
        <div
          className="logo"
          style={{
            height: "235px",
            width: "263px",
            left: "0px",
            top: "0px",
            borderRadius: "0px",
          }}
        ></div>
        <Connection
          updateCollection={(coll) => {
            setCollections(coll);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              height: "235px",
              width: "263px",
              left: "0px",
              top: "0px",
              borderRadius: "0px",
            }}
          >
            <div
              style={{
                top: "180px",
                left: "80px",
                width: "563px",
              }}
            >
              <SearchBox />
            </div>
          </div>
          <Databases collections={collections} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MultiDB GUI {new Date().getUTCFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
