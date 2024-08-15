import ChatBox from "@/components/chat/ChatBox";
import Layout from "@/components/layout/Layout";

export default function Page({params: {id}}) {
  return <Layout title="Chat">
    <div className="flex flex-col gap-3">
      <ChatBox id={id} />
    </div>
  </Layout>
}