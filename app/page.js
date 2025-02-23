"use client";

import { BiUserPlus } from "react-icons/bi";
import Table from "./components/table";
import AddUserForm from "./components/addUserForm";
import UpdateUserForm from "./components/updateUserForm";
import { useState, useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [users, setUsers] = useState([]); // Define setUsers state
  const [refresh, setRefresh] = useState(false);
  const [whichForm, setWhichForm] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const handleAddUser = () => {
    setWhichForm("add");
    setResetForm(resetForm); // Toggle to trigger reset
    setVisible(true);
  };

  const handleUpdate = () => {
    setVisible(false); // Hide the form after update
    fetchUsers(); // Refresh the user list
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setIsloading(false);
    setUsers(data.data);
    return data.data; // Assuming the response structure contains the user data here
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  return (
    <section>
      <div className="">
        <main className="py-5 px-10">
          <h1 className="text-xl md:text-xl text-center font-bold py-10">
            Employee Management
          </h1>
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                onClick={handleAddUser}
                className="flex bg-indigo-600 text-white px-4 py-2 border rounded-md hover:bg-gray-400 hover:text-indigo-800 hover:border-indigo-800"
              >
                Add Employee{" "}
                <span className="px-1">
                  <BiUserPlus size={23}></BiUserPlus>
                </span>
              </button>
            </div>
          </div>

          {/* collapsible form */}
          {visible && (
            <>
              {whichForm === "add" && (
                <AddUserForm setUsers={setUsers} resetTrigger={resetForm} />
              )}
            </>
          )}
          {whichForm === "update" && selectedUser && (
            <UpdateUserForm user={selectedUser} onSubmit={handleUpdate} />
          )}

          {/* table */}
          {isLoading ? (
            <p className="container mx-auto py-10 text-center">
              LOADING ... :/{" "}
            </p>
          ) : (
            <div className="container mx-auto py-5">
              <Table
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                pickUpFormType={setWhichForm}
                // selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          Boryana Yordanova
        </footer>
      </div>
    </section>
  );
}
