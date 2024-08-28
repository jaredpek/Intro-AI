import ChatBox from "@/components/chat/ChatBox";
import Layout from "@/components/layout/Layout";

export default async function Page() {
  return <Layout title="Chat">
    <div className="flex flex-col gap-3">
      <ChatBox />
    </div>
  </Layout>
}
