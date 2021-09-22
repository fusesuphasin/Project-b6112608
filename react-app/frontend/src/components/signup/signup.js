import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Toast from "../toast/Toast";
import "./signup.css";

const testListSuccess = [
  {
    id: 1,
    title: "Risgister Successfull",
    description: "Please SignIn",
    backgroundColor: "#5cb85c",
    // icon: checkIcon,
  },
];

const testListError = [
  {
    id: 1,
    title: "Can nit Risgister",
    description: "Please check your form",
    backgroundColor: "#d9534f",
    // icon: errorIcon,
  },
];

function Signup() {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [styleErrorName, setStyleErrorName] = useState();
  const [styleErrorEmail, setStyleErrorEmail] = useState();
  const [styleErrorPassword, setStyleErrorPassword] = useState();
  const [styleErrorAddress, setStyleErrorAddress] = useState();
  const [styleErrorBirthday, setStyleErrorBirthday] = useState();
  const [styleErrorPhone, setStyleErrorPhone] = useState();

  const onSubmit = async (data) => {
    console.log(data);

    await fetch("http://localhost:4201/signup/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("register successfully");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("can't register ");
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  useEffect(() => {
    if (errors.Name) {
      setStyleErrorName({ border: "1px solid red" });
    } else {
      setStyleErrorName();
    }
    if (errors.Email) {
      setStyleErrorEmail({ border: "1px solid red" });
    } else {
      setStyleErrorEmail();
    }
    if (errors.Password) {
      setStyleErrorPassword({ border: "1px solid red" });
    } else {
      setStyleErrorPassword();
    }
    if (errors.Address) {
      setStyleErrorAddress({ border: "1px solid red" });
    } else {
      setStyleErrorAddress();
    }
    if (errors.Phone) {
      setStyleErrorPhone({ border: "1px solid red" });
    } else {
      setStyleErrorPhone();
    }
    if (errors.Birthday) {
      setStyleErrorBirthday({ border: "1px solid red" });
    } else {
      setStyleErrorBirthday();
    }
  });

  return (
    <div>
      <Toast
        triger={success}
        toastList={testListSuccess}
        position="top-right"
      />
      <Toast triger={error} toastList={testListError} position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input
            style={styleErrorName}
            {...register("Name", {
              required: "Required",
              maxLength: 30,
              pattern: {
                value: "^[A-Za-z\\s]+$",
                message: "invalid Name",
              },
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Name && errors.Name?.message}
          </span>
        </div>
        <div>
          <label>Email</label>
          <input
            style={styleErrorEmail}
            {...register("Email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Email && errors.Email?.message}
          </span>
        </div>
        <div>
          <label>Password</label>
          <input
            style={styleErrorPassword}
            type="password"
            {...register("Password", {
              required: "Required",
              minLength: 4,
              pattern: {
                message: "invalid Name",
              },
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Password && "Password is required"}
          </span>
        </div>
        <div>
          <label>Birthday</label>
          <input
            style={styleErrorBirthday}
            type="date"
            {...register("Birthday", {
              required: true,
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Birthday && "Birthday is required"}
          </span>
        </div>
        <div>
          <label>Address</label>
          <input
            style={styleErrorAddress}
            {...register("Address", {
              required: "Required",
              minLength: 4,
              maxLength: 100,
              pattern: {
                message: "invalid Name",
              },
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Address && "Address is required"}
          </span>
        </div>
        <div>
          <label>Phone</label>
          <input
            style={styleErrorPhone}
            {...register("Phone", {
              required: "Required",
              pattern: {
                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                message: "Phone number must be 10 digit. E.g. 0123456789",
              },
            })}
          />
          <span
            style={{
              color: "red",
              display: "inline-block",
              textAlign: "left",
              float: "right",
              fontSize: "14px",
            }}
          >
            {errors.Phone && "Phone is required"}
          </span>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
