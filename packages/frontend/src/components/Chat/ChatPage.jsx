import RestrictedContent from "../Auth/RestrictedContent";
import ChatContainer from "./ChatContainer";
import ChatHistory from "./ChatHistory";
import Navbar from "./Navbar";

export default function ChatPage() {
    return (
        <RestrictedContent>
            <div className="flex flex-row">
                <Navbar />
                <ChatHistory />
                <ChatContainer /*onNewMessage={handleNewMessage}*/ messages={[]} />
            </div>
        </RestrictedContent>
    )
}
