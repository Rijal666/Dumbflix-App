/** @format */

import React from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import Navbars from "../components/Navbar";
import { API } from "../config/api";

export default function ListTrans() {
  let { data: trans } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(trans, "kontool");
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
                <th>start date</th>
                <th>due date</th>
                <th>Status User</th>
              </tr>
            </thead>
            <tbody>
              {trans?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.user?.fullname}</td>
                    <td>{item?.startdate}</td>
                    <td>{item?.duedate}</td>
                    <td>{item?.user?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
