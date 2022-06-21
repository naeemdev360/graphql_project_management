import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { alertState } from "../atoms/alertAtom";

const ConfirmAlert = () => {
  const [state, setState] = useRecoilState(alertState);
  const btnRef = useRef(null);
  const { confirm, message } = state;

  useEffect(() => {
    setState((state) => ({ ...state, btnRef }));
  }, [setState]);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary "
        data-bs-toggle="modal"
        data-bs-target="#confirmAlert"
        hidden
        ref={btnRef}
      >
        <div className="d-flex align-items-center">
          <span>Add Client</span>
        </div>
      </button>

      <div
        className="modal fade"
        id="confirmAlert"
        aria-labelledby="confirmAlertLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmAlertLabel">
                Confirm Alert
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h3>{message}</h3>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={confirm}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmAlert;
