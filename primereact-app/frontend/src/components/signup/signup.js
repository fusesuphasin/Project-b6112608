import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import "primeflex/primeflex.css";
import "./signup.css";

function Signup() {
  const toast = useRef(null);
  let history = useHistory();
  const [users, setUsers] = useState({
    name: String,
    email: String,
    password: String,
    birthday: String,
    address: String,
    phone: String,
    img: String,
  });
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    date: "",
    address: "",
    phone: "",
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    fetch("http://localhost:4200/signup/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("register successfully");
        toast.current.show({
          severity: "success",
          summary: "Register Successfully",
          detail: "Please SignIn",
          life: 3000,
        });
        setTimeout((e) => {
          history.push("/");
        }, 1000);
      })
      .catch((err) => {
        console.log("can't register ");
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        });
      });

    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {});

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="p-d-flex p-jc-center form-demo">
        <div
          className="card"
          style={{
            marginTop: "5%",
            marginBottom: "5%",
            padding: "5%",
            boxShadow:
              "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px",
          }}
        >
          <h2 className="p-text-center" style={{ marginTop: "-50px" }}>
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name is required.",
                    pattern: {
                      value:
                        /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/g,
                      message:
                        "Firstname and Lastname must begin with uppercase. E.g. Suphasin Yosang",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="p-field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required.",
                    pattern: {
                      value: /^([a-zA-Z]{6,})/,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Controller
                  name="birthday"
                  control={control}
                  rules={{ required: "Birthday is required." }}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.birthday}
                      {...field}
                      value={field.value}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label
                  htmlFor="birthday"
                  className={classNames({ "p-error": errors.birthday })}
                >
                  Birthday*
                </label>
              </span>
              {getFormErrorMessage("birthday")}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "address is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.address}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="address"
                  className={classNames({ "p-error": errors.address })}
                >
                  Address*
                </label>
              </span>
              {getFormErrorMessage("address")}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone is required.",
                    pattern: {
                      value:
                        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      message: "Phone number must be 10 digit. E.g. 0123456789",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.phone}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="phone"
                  className={classNames({ "p-error": errors.phone })}
                >
                  Phone*
                </label>
              </span>
              {getFormErrorMessage("phone")}
            </div>

            <Button type="submit" label="Submit" className="p-mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
