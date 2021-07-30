import axios from "axios";

export function addConnection(data) {
  data = typeof data !== "string" ? JSON.stringify(data) : data;

  let config = {
    method: "post",
    url: "/api/mongo/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export async function getDatabases(data) {
  var config = {
    method: "get",
    url: `/api/mongo/db?sessionId=${data}`,
    headers: {},
  };

  let response = await axios(config).catch(() => null);
  return response.data;
}

export async function getAllConnections() {
  const config = {
    method: "get",
    url: "/api/mongo/connections",
    headers: {},
  };

  let response = await axios(config).catch(() => null);
  return response.data;
}

export async function getCollections(data) {
  data = data.split(":");
  let sessionId = data[0];
  let db = data[1];
  const config = {
    method: "get",
    url: `/api/mongo/collections?sessionId=${sessionId}&db=${db}`,
    headers: {},
  };

  let response = await axios(config).catch(function (error) {
    console.log(error);
  });
  return response.data;
}

export async function addNewConnection(data) {
  var axios = require("axios");
  data = JSON.stringify({
    uri: data,
  });

  var config = {
    method: "post",
    url: "/api/mongo/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response = await axios(config).catch(function (error) {
    console.log(error);
  });
  return response.data;
}

export async function getAllDocuments(data) {
  let { sessionId, db, collection } = data;
  const config = {
    method: "get",
    url: `/api/mongo/documents?sessionId=${sessionId}&db=${db}&collection=${collection}`,
    headers: {},
  };

  let response = await axios(config).catch(function (error) {
    return { data: [] };
  });
  return response.data;
}

export async function getDocumentsByQuery(data) {
  let { sessionId, db, collection } = data;
  let { query } = data;
  data = JSON.stringify({
    query: {
      isDone: true,
    },
  });

  let config = {
    method: "post",
    url: `/api/mongo/search/query?sessionId=${sessionId}&db=${db}&collection=${collection}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response = await axios(config).catch(function (error) {
    console.log(error);
  });
  return response.data;
}
