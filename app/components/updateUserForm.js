import React, { useState, useEffect } from "react";
import { BiBrush } from "react-icons/bi";

const formReducer = (state, event) => {
  return { ...state, [event.name]: event.value };
};

const UpdateUserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    salary: "",
    date: "",
    status: "",
  });

  const handleSubmit = async (event) => {
    console.log(formData);
    console.log(user);
    event.preventDefault();
    console.log(formData);
    console.log(user._id);
    const response = await fetch(`/api/users`, {
      // Ensure the correct API endpoint is used
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user._id,
        updatedData: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          salary: formData.salary,
          date: formData.date,
          status: formData.status,
        },
      }),
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
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        salary: user.salary || "",
        date: user.date || "",
        status: user.status || "",
      });
    }
  }, [user]);

  return (
    <form
      className="container grid py-5 mx-auto w-full lg:grid-cols-2 w-4/6 gap-4 text-gray-500"
      onSubmit={handleSubmit}
    >
      {/* Form fields for firstname, lastname, email, etc. */}
      <div className="input-type">
        <input
          name="firstname"
          value={formData.firstname}
          onChange={(e) => setFormData(formReducer(formData, e.target))}
          placeholder="First Name"
          className="border w-full px-5 py-3 focus:outline-none"
        />
      </div>
      <div className="input-type">
        <input
          name="lastname"
          value={formData.lastname}
          onChange={(e) => setFormData(formReducer(formData, e.target))}
          placeholder="Last Name"
          className="border w-full px-5 py-3 focus:outline-none"
        />
      </div>
      <div className="input-type">
        <input
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(formReducer(formData, e.target))}
          placeholder="Email"
          className="border w-full px-5 py-3 focus:outline-none"
        />
      </div>
      <div className="input-type">
        <input
          name="salary"
          value={formData.salary}
          onChange={(e) => setFormData(formReducer(formData, e.target))}
          placeholder="Salary"
          className="border w-full px-5 py-3 focus:outline-none"
        />
      </div>

      <div className="input-type">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData(formReducer(formData, e.target))}
          placeholder="Date"
          className="border px-5 py-3 focus:outline-none rounded-md text-gray-500"
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={(e) => setFormData(formReducer(formData, e.target))}
            name="status"
            value="Active"
            checked={formData.status === "Active"}
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-500">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={(e) => setFormData(formReducer(formData, e.target))}
            name="status"
            value="Inactive"
            checked={formData.status === "Inactive"}
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-500">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center align-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
        {/* <button type="submit"> */}
        Submit{" "}
        <span className="px-1">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
};

export default UpdateUserForm;
