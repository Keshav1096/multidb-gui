import { useEffect, useState } from "react";
import MenuDropDown from "../components/MenuDropDown";

import { getAllConnections, getDatabases } from "../services/api";

export default function Connection({ updateCollection }) {
  let [connections, setConnections] = useState([]);
  let [databases, setDatabases] = useState({});
  const [refresh, toggleRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await getAllConnections();
      for (let i = 0; i < data.data.length; i++) {
        let db = await getDatabases(data.data[i].sessionId);
        databases[data.data[i].sessionId] = db.data.databases;
      }
      setDatabases(databases);
      setConnections(data.data);
    }
    fetchData();
  }, [databases, refresh]);

  return (
    <div>
      <MenuDropDown
        list={connections}
        dbs={databases}
        updateDb={(coll) => {
          updateCollection(coll);
        }}
      />
    </div>
  );
}
