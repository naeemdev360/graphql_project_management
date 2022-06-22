import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddProjectModal = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const toggleBtn = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientId, setClientId] = useState("");
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !description.trim() ||
      !status.trim() ||
      !clientId.trim()
    )
      return alert("Fill all the inputs");
    // remove the modal
    toggleBtn.current.click();
    //Add the client
    addProject(name, description, status, clientId);
    // console.log(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("");
    setClientId("");
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProject"
        ref={toggleBtn}
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <span>Add Project</span>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProject"
        aria-labelledby="addProjectLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Status</option>
                    <option value="new">No Started</option>
                    <option value="progress">Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    disabled={loading}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option>Client</option>
                    {data?.clients?.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
