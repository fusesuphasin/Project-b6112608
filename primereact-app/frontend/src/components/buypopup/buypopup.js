import React, { Component } from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function buypopup() {
  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: this.accept,
      reject: this.reject,
    });
  };

  const confirm2 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: this.accept,
      reject: this.reject,
    });
  };

  return (
    <div>
      <Toast ref={(el) => (this.toast = el)} />

      <div className="card">
        <h5>Basic</h5>
        <Button
          onClick={confirm1}
          icon="pi pi-check"
          label="Confirm"
          className="p-mr-2"
        ></Button>
        <Button
          onClick={confirm2}
          icon="pi pi-times"
          label="Delete"
          className="p-button-danger p-button-outlined"
        ></Button>

        <h5>Using ConfirmPopup tag</h5>
        <ConfirmPopup
          target={document.getElementById("button")}
          visible={this.state.visible}
          onHide={() => this.setState({ visible: false })}
          message="Are you sure you want to proceed?"
          icon="pi pi-exclamation-triangle"
          accept={this.accept}
          reject={this.reject}
        />
        <Button
          id="button"
          onClick={() => this.setState({ visible: true })}
          icon="pi pi-check"
          label="Confirm"
        />
      </div>
    </div>
  );
}

export default buypopup;
