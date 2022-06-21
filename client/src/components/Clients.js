import React from "react";
import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/clientQueries";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!!</p>;
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>&nbsp;</th>
            </tr>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </thead>
        </table>
      )}
    </>
  );
};
export default Clients;
