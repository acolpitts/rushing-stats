import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import Layout from "../components/Layout.component";
import Table from "../components/Table.component";

const StyledSection = styled.section`
  width: 100%;
`;

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

  // table columns
  const columns = useMemo(
    () => [
      {
        // first group
        Header: " ",
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
      <StyledSection>
        <Table defaultG columns={columns} data={data} />
      </StyledSection>
    </Layout>
  );
}

export default App;
