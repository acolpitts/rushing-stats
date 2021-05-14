import React, { useState, useEffect, useMemo } from "react";

import Layout from "../components/Layout.component";
import Table from "../components/Table.component";
function App() {
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:1337/api/v1/football");
      const playerStats = await response.json();
      setData(playerStats.data);
    })();
  }, []);

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: " ",
        // First group columns
        columns: [
          {
            Header: "Team",
            accessor: "Team",
          },
          {
            Header: "Player",
            accessor: "Player",
          },
          {
            Header: "Yds",
            accessor: "Yds",
          },
          {
            Header: "Yds/G",
            accessor: "Yds/G",
          },
          {
            Header: "TD",
            accessor: "TD",
          },
        ],
      },
    ],
    []
  );
  return (
    <Layout>
      <section>
        <Table defaultG columns={columns} data={data} />
      </section>
    </Layout>
  );
}

export default App;
