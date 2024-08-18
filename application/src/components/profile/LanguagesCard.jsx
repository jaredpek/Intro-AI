import DeleteBtn from "../fields/DeleteBtn";

export default function LanguagesCard({data, action}) {
  return <div className="border rounded-lg px-3 py-4 flex flex-col gap-3 relative">
    <div>{data.languages} ({data.proficiency})</div>
    <DeleteBtn className="absolute top-2 right-2" action={action} />
  </div>
}