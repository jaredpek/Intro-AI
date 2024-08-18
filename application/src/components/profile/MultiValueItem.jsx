"use client";

import DeleteBtn from "../fields/DeleteBtn";

export default function MultiValueItem({item, action, className=""}) {
  return <div className={`flex gap-2 items-center ${className}`}>
    <div>{item}</div>
    <DeleteBtn action={action} />
  </div>
}