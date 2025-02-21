import { BiCheck } from "react-icons/bi";
export default function Bug({ message }) {
  return (
    <div className="success container mx-auto border border-red-200 bg-red-400 w-3/6 text-gray-900 text-md my-4 py-2 tetxt-center bg-opacity-5">
      {message} <BiCheck size={25} color={"rgb(228 113 113)"}></BiCheck>
    </div>
  );
}
