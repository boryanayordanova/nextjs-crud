"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";

const formReducer = (state, event) => {
  if (event && event.target) {
    // Handle input events
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  } else if (typeof event === "object") {
    // Handle direct state updates
    return {
      ...state,
      ...event,
    };
  }
  return state;
};

export default function AddUserForm({ setUsers, resetTrigger }) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const timeoutRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      salary: "",
      date: "",
      status: "",
    });
    // setFailedMessage("");
    // setSuccessMessage("");
  };

  useEffect(() => {
    if (resetTrigger) {
      resetForm();
    }
  }, [resetTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (
        !formData.firstname?.trim() ||
        !formData.lastname?.trim() ||
        !formData.email?.trim()
      ) {
        setFailedMessage("Please fill all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFailedMessage("Please enter a valid email address");
        return;
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // throw new Error(result.message || "Failed to add employee");
        setFailedMessage("Failed to add employee");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setFailedMessage("");
        }, 1000);
      } else {
        setSuccessMessage("Employee added successfully!");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setFailedMessage(
        error.message || "An error occurred while adding employee"
      );
    }

    // Reset handled by resetForm()
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data.data;
  };

  return (
    <>
      {successMessage ? (
        <Success message={successMessage} />
      ) : failedMessage ? (
        <Bug message={failedMessage} />
      ) : null}

      <form
        className="container grid py-5 mx-auto w-full grid lg:grid-cols-2 w-4/6 gap-4 text-gray-500"
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="firstname"
            value={formData.firstname || ""}
            placeholder="FirstName"
            className="border w-full px-5 py-3 focus:outline-none"
            minLength="1"
            maxLength="20"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="lastname"
            value={formData.lastname || ""}
            placeholder="LastName"
            className="border w-full px-5 py-3 focus:outline-none"
            minLength="1"
            maxLength="20"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            onChange={(e) => setFormData(e)}
            name="email"
            value={formData.email || ""}
            placeholder="Email"
            className="border w-full px-5 py-3 focus:outline-none"
            minLength="1"
            maxLength="20"
            pattern="^[^@]+@[^@]+\.[^@]+$"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setFormData(e)}
            name="salary"
            value={formData.salary || ""}
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none"
            minLength="1"
            maxLength="10"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            onChange={(e) => setFormData(e)}
            name="date"
            value={formData.date || ""}
            placeholder="Date"
            className="border px-5 py-3 focus:outline-none rounded-md text-gray-500"
            required
          />
        </div>
        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              onChange={(e) => setFormData(e)}
              name="status"
              value="Active"
              checked={formData.status === "Active"}
              id="radioDefault1"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              required
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
              checked={formData.status === "Inactive"}
              id="radioDefault2"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              required
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
