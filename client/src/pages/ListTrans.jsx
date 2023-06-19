/** @format */

import React from "react";
import { Container, Table } from "react-bootstrap";
import Navbars from "../components/Navbar";

export default function ListTrans() {
  return (
    <div>
      <Navbars />
      <Container>
        <div className="m-5">
          <h1 className="fw-bold">Income Transaction</h1>
          <Table responsive striped variant="dark">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Status User</th>
              </tr>
            </thead>
            <tbody>
              {/* {transactions?.map((item, index) => {
                return ( */}
              <tr>
                <td>1</td>
                <td>test</td>
                <td>test</td>
              </tr>
              {/* );
              })} */}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
