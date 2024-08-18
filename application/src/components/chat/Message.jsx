export default function Message({role, message}) {
  return <div className={`w-full flex ${(role == "user") ? "justify-end" : "justify-start"}`}>
    <div className="w-[70%]">
      <div>{role}:</div>
      <div className={`border rounded-lg py-3 px-4 w-full`}>
        <div>{message}</div>
      </div>
    </div>
  </div>
}