"use client";

import { IoTrashOutline } from "react-icons/io5";

export default function DeleteBtn({action, className=""}) {
  return <div
    className={`border p-1 rounded-lg text-gray-500 hover:text-gray-400 cursor-pointer ${className}`}
    onClick={action}
  >
    <IoTrashOutline />
  </div>
}