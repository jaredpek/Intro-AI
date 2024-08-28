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
    if (history.length && history[0][0] == "human") {
      setLoading(true);
      setMessage("");
      const ordered = [...history]; ordered.reverse();
      axios.post(`/api/chat`, {history: ordered, message})
        .then(({data: {response}}) => setHistory([
         ["ai", response],  ...history, 
        ]))
        .finally(() => setLoading(false));
    }
  }, [history]);

  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!message || loading) return;
    setHistory([
      ["human", message], ...history, 
    ]);
  }

  return <>
    <div className="h-full w-full py-4 overflow-y-auto flex flex-col-reverse gap-3 rounded-lg">
      {loading && <Message role={"ai"} message={<PulseLoader size={7} color="gray" />} />}
      {
        history.length ?
        history.map(([role, message], i) => <Message
          key={i} role={role} message={message} 
        />) :
        <div className="w-full h-full select-none text-gray-400 flex items-center justify-center text-center text-wrap">Hello! I am Jared, send me a message to start chatting!</div>
      }
    </div>
    <form className="flex flex-col gap-3 h-fit" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  </>
}
