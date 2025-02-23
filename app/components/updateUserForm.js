import React, { useState, useEffect } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";

const formReducer = (state, event) => {
  return { ...state, [event.name]: event.value };
};

const UpdateUserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: user ? user.firstname : "",
    lastname: user ? user.lastname : "",
    email: user ? user.email : "",
    salary: user ? user.salary : "",
    date: user ? user.date : "",
    status: user ? user.status : "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/users/${user.id}`, { // Ensure the correct API endpoint is used
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle successful update
      onSubmit(formData); // Call the onSubmit function passed as a prop
    } else {
      // Handle update failure
      console.error("Update failed");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        salary: user.salary,
        date: user.date,
        status: user.status,
      });
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for firstname, lastname, email, etc. */}
      <input
        name="firstname"
        value={formData.firstname}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="First Name"
      />
      <input
        name="lastname"
        value={formData.lastname}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="Last Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="Email"
      />
      <input
        name="salary"
        value={formData.salary}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="Salary"
      />
      <input
        name="date"
        value={formData.date}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="Date"
      />
      <input
        name="status"
        value={formData.status}
        onChange={(e) => setFormData(formReducer(formData, e.target))}
        placeholder="Status"
      />
      <button type="submit">
        <BiBrush /> Submit
      </button>
    </form>
  );
};

export default UpdateUserForm;
