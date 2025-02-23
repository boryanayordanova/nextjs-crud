"use client";

import { useReducer, useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";

const formReducer = (state, event) => {
  if (event && event.target) {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  }
  return state; // Return the current state if event or event.target is undefined
};

export default function AddUserForm({ setUsers }) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return console.log("empty fields");
    }
    const response = await fetch("/api/users", { // Ensure the correct API endpoint is used
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Clear the form
      setFormData({ // Clear the form fields after successful submission
        firstname: "",
        lastname: "",
        email: "",
        salary: "",
        date: "",
        status: "",
      });
      // Fetch updated user list
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setSuccessMessage("User added successfully!");
    } else {
      setFailedMessage("User adding failed!");
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data.data; // Assuming the response structure contains the user data here
  };



  return (
    <>
      {successMessage && <Success message={successMessage} />}
      {failedMessage && <Bug message={failedMessage} />}

      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4 text-gray-500"
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="firstname"
            placeholder="FirstName"
            className="border w-full px-5 py-3 focus:outline-none"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="lastname"
            placeholder="LastName"
            className="border w-full px-5 py-3 focus:outline-none"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="email"
            placeholder="Email"
            className="border w-full px-5 py-3 focus:outline-none"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="salary"
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none"
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            onChange={(e) => setFormData(e)}
            name="date"
            placeholder="Date"
            className="border px-5 py-3 focus:outline-none rounded-md text-gray-500"
          />
        </div>
        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              onChange={(e) => setFormData(e)}
              name="status"
              value="Active"
              id="radioDefault1"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-500"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              onChange={(e) => setFormData(e)}
              name="status"
              value="Inactive"
              id="radioDefault2"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-500"
            >
              Inactive
            </label>
          </div>
        </div>

        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          Add{" "}
          <span className="px-1">
            <BiPlus size={24}></BiPlus>
          </span>
        </button>
      </form>
    </>
  );
}
