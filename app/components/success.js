import { BiCheck } from "react-icons/bi";
export default function Success({ message }) {
  return (
    <div className="success container mx-auto flex">
      <div className="flex center justify-center border border-yellow-200 bg-yellow-400 w-3/6 text-gray-900 text-md my-4 py-6 text-center bg-opacity-5">
        {message} <BiCheck size={25} color={"rgb(34,197,94)"}></BiCheck>
      </div>
    </div>
  );
}
