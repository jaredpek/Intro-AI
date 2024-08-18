"use client";

import { useState } from "react";
import InputField from "../fields/InputField";
import EducationCard from "./EducationCard";

export default function EducationSection({value, setValue}) {
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [institution, setInstitution] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [grade, setGrade] = useState("");
  const [details, setDetails] = useState("");

  const addEducation = () => {
    setValue([...value, {
      typeOfStudy, areaOfStudy, institution,
      start, end, grade, details,
    }])
    for (let setter of [
      setTypeOfStudy, setAreaOfStudy, setInstitution,
      setStart, setEnd, setGrade, setDetails
    ]) setter("");
  }

  const deleteEducation = (item) => {
    const values = [...value];
    values.splice(values.indexOf(item), 1);
    setValue(values);
  }

  return <InputField title="Education">
    <div className="border rounded-lg p-3 w-full flex flex-col gap-3">
      {
        !!value.length && value.map(data => <EducationCard
          key={`${data.typeOfStudy}_${areaOfStudy}`} data={data}
          action={() => deleteEducation(data)}
        />)
      }
      <div className="border rounded-lg p-3 flex flex-col gap-3">
        <InputField title="Type of Education">
          <input value={typeOfStudy} onChange={e => setTypeOfStudy(e.target.value)} />
        </InputField>
        <InputField title="Area of Study">
          <input value={areaOfStudy} onChange={e => setAreaOfStudy(e.target.value)} />
        </InputField>
        <InputField title="Institution">
          <input value={institution} onChange={e => setInstitution(e.target.value)} />
        </InputField>
        <InputField title="Start Date">
          <input type="date" value={start} onChange={e => setStart(e.target.value)} />
        </InputField>
        <InputField title="End Date">
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        </InputField>
        <InputField title="Grade">
          <input value={grade} onChange={e => setGrade(e.target.value)} />
        </InputField>
        <InputField title="Details">
          <textarea value={details} onChange={e => setDetails(e.target.value)} />
        </InputField>
        <button onClick={addEducation}>Add</button>
      </div>
    </div>
  </InputField>
}
