"use client";

import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import InputField from "../fields/InputField";

export default function SocialLinkSection({value, setValue}) {
  const [entry, setEntry] = useState("");

  const addSocialLink = () => {
    if (value.includes(entry)) return;
    value.push(entry);
    setEntry("");
  }

  const deleteSocialLink = (link) => {
    const values = [...value];
    values.splice(values.indexOf(link), 1);
    setValue(values);
  }

  return <InputField title="Social Links">
    <div className="p-3 border rounded-lg w-full flex flex-col gap-3">
      <InputField 
        title="Link" 
        action={addSocialLink}
        actionTitle={<IoIosAdd size={24} />}
      >
        <input value={entry} onChange={e => setEntry(e.target.value)} />
      </InputField>
      {
        !!value.length &&
        <div className="flex flex-col gap-1 border p-3 rounded-lg">
          {value.map((link) => {
            return <div key={link} className="flex gap-2 items-center">
              <div>{link}</div>
              <div
                className="border p-1 rounded-lg text-gray-500 hover:text-gray-400 cursor-pointer"
                onClick={() => deleteSocialLink(link)}
              >
                <IoTrashOutline />
              </div>
            </div>
          })}
        </div>
      }
    </div>
  </InputField>
}
