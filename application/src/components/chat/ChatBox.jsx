"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatBox({id}) {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (history.length && history[history.length - 1].role == "user")
      axios.post(`/api/chat/${id}`, {history, message})
        .then(({data: {response}}) => setHistory(
          [...history, {role: "model", parts: [{text: response}]}
        ]))
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
      <div className="border w-full max-h-[550px] p-4 overflow-y-auto rounded-lg">
        {
          history.map(({role, parts}, i) => <div key={i}>
            <div>{role}: {parts[0].text}</div>
          </div>)
        }
      </div>
    }
    <form className="flex flex-col gap-3" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  </>
}