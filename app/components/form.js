import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";

export default function Form({ setRefresh, setUsers }) {
  const flag = true;

  return (
    <div className="container mx-auto py-5">
      {flag ? <AddUserForm setUsers={setUsers} /> : <UpdateUserForm />}
    </div>
  );
}
