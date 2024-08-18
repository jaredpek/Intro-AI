"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Message from "./Message";

export default function ChatBox({id}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (history.length && history[history.length - 1].role == "user")
      setLoading(true);
      axios.post(`/api/chat/${id}`, {history, message})
        .then(({data: {response}}) => setHistory(
          [...history, {role: "model", parts: [{text: response}]}
        ]))
        .finally(() => setLoading(false));
  }, [history]);

  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!message) return;
    setHistory([...history, {role: "user", parts: [{text: message}]}]);
    setMessage("");
  }

  return <>
    {
      !!history.length && 
      <div className="relative border w-full max-h-[550px] p-4 overflow-y-auto grid gap-3 rounded-lg">
        {history.map(({role, parts}, i) => {
          return <Message key={i} role={role} message={parts[0].text} />
        })}
        {loading && <Message role={"model"} message={"loading..."} />}
      </div>
    }
    <form className="flex flex-col gap-3" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  </>
}