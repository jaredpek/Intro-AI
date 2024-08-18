"use client";

import { useState } from "react";
import InputField from "../fields/InputField";
import MultiValueItem from "./MultiValueItem";

export default function LanguagesSection({value, setValue}) {
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const addLanguage = () => {
    setValue([...value, {language, proficiency}]);
    for (let setter of [setLanguage, setProficiency]) setter("");
  }

  const deleteLanguage = (item) => {
    const values = [...value];
    values.splice(values.indexOf(item), 1);
    setValue(values);
  }

  return <InputField title="Languages">
    <div className="border rounded-lg p-3 w-full flex flex-col gap-3">
      {
        !!value.length && value.map(data => <MultiValueItem
          className="border p-3 rounded-lg"
          key={`${data.language}_${data.proficiency}`} 
          item={`${data.language} (${data.proficiency})`}
          action={() => deleteLanguage(data)}
        />)
      }
      <div className="border rounded-lg p-3 flex flex-col gap-3">
        <InputField title="Language">
          <input value={language} onChange={e => setLanguage(e.target.value)} />
        </InputField>
        <InputField title="Proficiency">
          <input value={proficiency} onChange={e => setProficiency(e.target.value)} />
        </InputField>
        <button onClick={addLanguage}>Add</button>
      </div>
    </div>
  </InputField>
}
