"use client";

import { BiUserPlus } from "react-icons/bi";
import Table from "./components/table";
import Form from "./components/form";
import { useState } from "react";
export default function Home() {
  const [visible, setVisible] = useState(false);

  const handler = () => {
    setVisible(!visible);
  };
  return (
    <section>
      <div className="">
        <main className="py-5 px-10">
          <h1 className="text-xl md:text-xl text-center font-bold py-10">
            Employee Management
          </h1>
          <div className="container mx-auto flex jusctify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                onClick={handler}
                className="flex bg-indigo-600 text-white px-4 py-2 border rounded-md hover:bg-gray-400 hover:text-indigo-800 hover:border-indigo-800"
              >
                Add Employee{" "}
                <span className="px-1">
                  <BiUserPlus size={23}></BiUserPlus>
                </span>
              </button>
            </div>
          </div>

          {/* collabpsable form */}
          <div className="container mx-auto py-5">
            {visible ? <Form /> : <></>}
          </div>

          {/* table */}
          <div className="container mx-auto py-5">
            <Table />
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          Boryana Yordanova
        </footer>
      </div>
    </section>
  );
}
