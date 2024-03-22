import RestrictedContent from "../Auth/RestrictedContent";
import ChatContainer from "./ChatContainer";
import ChatHistory from "./ChatHistory";

export default function ChatPage() {
    return (
        <RestrictedContent>
            <div className="flex flex-row">
                <ChatHistory />
                <ChatContainer messages={[]} />
            </div>
        </RestrictedContent>
    )
}