import ChatBox from "@/components/chat/ChatBox";

export default function Page({params: {id}}) {
  return <>
    <ChatBox id={id} />
  </>
}