import React, { useDebugValue } from "react";
import classNames from "classnames";

import "./ModalConfirm.css";

function ModalConfirm({ className, title, message, buttonPressed, mainstyle, ...props }) {
  const handleActionButtonYes = () => buttonPressed(true);
  const handleActionButtonNo = () => buttonPressed(false);
  return (
    <div className="modal-confirm-main" mainstyle={mainstyle.toString()}>
      <div
        className={classNames("modal-confirm-container", className)}
        {...props}
      >
        <h1 className="modal-confirm-title">{title}</h1>
        <div className="modal-confirm-message">{message}</div>
        <div className="modal-confirm-buttons">
          <button className="modal-confirm-yes" onClick={handleActionButtonYes}>
            Sí
          </button>
          <button className="modal-confirm-no" onClick={handleActionButtonNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
