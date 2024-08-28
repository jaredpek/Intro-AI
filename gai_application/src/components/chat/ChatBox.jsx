"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Message from "./Message";
import { PulseLoader } from "react-spinners";

export default function ChatBox() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (history.length && history[history.length - 1][0] == "human") {
      setLoading(true);
      setMessage("");
      axios.post(`/api/chat`, {history, message})
        .then(({data: {response}}) => setHistory([
          ...history, ["ai", response]
        ]))
        .finally(() => setLoading(false));
    }
  }, [history]);

  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!message || loading) return;
    setHistory([
      ...history, ["human", message],
    ]);
  }

  return <>
    {
      !!history.length && 
      <div className="relative border w-full max-h-[550px] p-4 overflow-y-auto grid gap-3 rounded-lg">
        {
          history.map(([role, message], i) => <Message
            key={i} role={role} message={message} 
          />)
        }
        {loading && <Message role={"ai"} message={<PulseLoader size={7} />} />}
      </div>
    }
    <form className="flex flex-col gap-3" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  </>
}