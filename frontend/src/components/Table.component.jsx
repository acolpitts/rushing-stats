import React, { useState } from "react";
import { useFilters, useTable, useSortBy } from "react-table";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";

import StyledTable, {
  StyledTableSearch,
  StyledTabelHeader,
} from "./Table.styled";
import StyledButton from "./Button.styled";

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  }

  // Other formats goes here
  return false;
}

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
    exportData,
  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,
    },
    useFilters,
    useSortBy,
    useExportData
  );

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("Player", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
      <StyledTabelHeader>
        <StyledTableSearch
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search for player"}
          role="search"
        />
        <StyledButton
          onClick={() => {
            exportData("csv", false);
          }}
        >
          <span className="material-icons">file_download</span>
        </StyledButton>
      </StyledTabelHeader>

      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
}
