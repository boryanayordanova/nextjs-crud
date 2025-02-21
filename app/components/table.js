import Image from "next/image";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
export default function Table() {
  return (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-500">
        <tr>
          <th className="px-16 py-2">
            <span className="text-gray-800">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-800">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-800">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-800">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-800">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-800">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-500">
        {Tr()}
        {Tr()}
        {Tr()}
        {Tr()}
      </tbody>
    </table>
  );
}

function Tr() {
  return (
    <tr className="bg-gray-200 text-center">
      <td className="mx-16 py-2 flex flex-row items-center">
        {/* <Image src="" alt="" /> */}
        <span className="text-center ml-2 font-semibold">John Doe</span>
      </td>
      <td className="px-15 py-2">
        <span>dailytution@gmail.com</span>
      </td>
      <td className="px-15 py-2">
        <span>$25000</span>
      </td>
      <td className="px-15 py-2">
        <span>10-05-2022</span>
      </td>
      <td className="px-15 py-2">
        <button className="cursor">
          <span className="bg-green-500 text-white px-5 py-1 rounded-md">
            Active
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor">
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor">
          <BiTrashAlt size={25} color={"rgb(224,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
