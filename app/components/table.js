import Image from "next/image";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useState, useEffect } from "react";

const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  console.log("response", response);
  if (response.ok) {
    console.log("User deleted successfully"); // Success message
    // Optionally, refresh the user list here
  } else {
    console.log("Failed to delete user", response);
  }
};

const editUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
  });
  if (response.ok) {
    console.log(response);
  }
};
export default function Table({ users }) {
  return (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-500">
        <tr>
          <th className="px-16 py-2">Name</th>
          <th className="px-16 py-2">Email</th>
          <th className="px-16 py-2">Status</th>
          <th className="px-16 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-gray-300">
        {users
          .slice()
          .reverse()
          .map((user) => (
            <tr key={user._id} className="bg-gray-200 text-center">
              <td>
                {user.firstname} {user.lastname}
              </td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td className="px-8 py-2 flex justify-evenly">
                <BiEdit
                  size={25}
                  color={"rgb(34,197,94)"}
                  onClick={() => editUser(user._id)}
                />
                <BiTrashAlt
                  size={25}
                  color={"rgb(224,63,94)"}
                  onClick={() => deleteUser(user._id)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
