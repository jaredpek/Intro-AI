"use client";

import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import InputField from "../fields/InputField";
import MultiValueItem from "./MultiValueItem";

export default function MultiValueSection({value, setValue, title, inputTitle}) {
  const [entry, setEntry] = useState("");

  const addItem = () => {
    if (value.includes(entry)) return;
    value.push(entry);
    setEntry("");
  }

  const deleteItem = (item) => {
    const values = [...value];
    values.splice(values.indexOf(item), 1);
    setValue(values);
  }

  return <InputField title={title}>
    <div className="p-3 border rounded-lg w-full flex flex-col gap-3">
      {
        !!value.length &&
        <div className="flex flex-col gap-1 border p-3 rounded-lg">
          {
            value.map((item) => <MultiValueItem 
              key={item} item={item} 
              action={() => deleteItem(item)} 
            />)
          }
        </div>
      }
      <InputField 
        title={inputTitle} 
        action={addItem}
        actionTitle={<IoIosAdd size={24} />}
      >
        <input value={entry} onChange={e => setEntry(e.target.value)} />
      </InputField>
    </div>
  </InputField>
}
