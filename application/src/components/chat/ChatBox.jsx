"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatBox({id}) {
  const [profile, setProfile] = useState(null);

  const chat = async () => {
    await axios.post(`/api/chat/${id}`).then(({data}) => console.log(data))
  }

  return <>
    <div onClick={chat}>Chat</div>
  </>
}