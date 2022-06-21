import React from "react";
import { useRecoilState } from "recoil";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { alertState } from "../atoms/alertAtom";

const ClientRow = ({ client }) => {
  const [{ btnRef }, setState] = useRecoilState(alertState);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  const onDeleteHandler = () => {
    btnRef.current.click();
    setState((currVal) => ({ ...currVal, show: true, confirm: deleteClient }));
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button onClick={onDeleteHandler} className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
