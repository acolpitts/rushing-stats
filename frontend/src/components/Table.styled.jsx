import styled from "styled-components";

const CHEVRON_SIZE = ".25em";

const StyledTable = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    padding: 8px;
  }

  tr:nth-child(odd) {
    background-color: #262626;
  }

  tr:nth-child(even) {
    background-color: #454545;
  }

  tr:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #262626;
    color: white;
  }

  & .sort-asc {
    &:after {
      border-style: solid;
      border-width: 0.125em 0.125em 0 0;
      content: "";
      display: inline-block;
      height: ${CHEVRON_SIZE};
      left: 0.5em;
      position: relative;
      bottom: 0.25;
      transform: rotate(-45deg);
      vertical-align: middle;
      width: ${CHEVRON_SIZE};
    }
  }

  & .sort-desc {
    &:after {
      border-style: solid;
      border-width: 0.125em 0.125em 0 0;
      content: "";
      display: inline-block;
      height: ${CHEVRON_SIZE};
      left: 0.5em;
      position: relative;
      vertical-align: middle;
      width: ${CHEVRON_SIZE};
      bottom: 0.5;
      transform: rotate(135deg);
    }
  }

  @media only screen and (max-width: 768px) {
    th:first-of-type,
    td:first-of-type {
      display: none;
    }
  }
`;

export const StyledTableSearch = styled.input`
  font-size: 1.25rem;
  width: 100%;
  height: 55px;
  border: none;
  padding-left: 10px;
`;

export const StyledTabelHeader = styled.div`
  display: flex;
`;

export default StyledTable;
