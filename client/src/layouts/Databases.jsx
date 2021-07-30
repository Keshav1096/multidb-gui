import { Tabs } from "antd";
import { useEffect, useState } from "react";
import EditableTable from "../components/EditableRows";
import { getAllDocuments } from "../services/api";

const { TabPane } = Tabs;

export default function Databases({ collections }) {
  let { coll, sessionId } = collections;

  let initColl = "";
  if (coll && coll.data && coll.data.length > 0) {
    initColl = coll.data[0].name;
  }
  const [collName, setCollName] = useState(initColl);
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      let sessionData = sessionId.split(":");
      let session = sessionData[0],
        db = sessionData[1];
      setData({ sessionId: session, db });
      // getAllDocuments(data);
    } catch (e) {}
  }, [collName, sessionId]);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{ height: 500 }}
        onTabClick={(event) => {
          console.log(event);
          setCollName(event);
        }}
      >
        {coll && coll.data && coll.data.length > 0 ? (
          coll.data.map((i) => (
            <TabPane tab={i.name} key={i.name}>
              {console.log(i.name)}
              <EditableTable collName={i.name} collData={data} />
            </TabPane>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </Tabs>
    </div>
  );
}
