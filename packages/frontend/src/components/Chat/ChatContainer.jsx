/**
 * Represents a chat container component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.messages - The array of messages to display in the chat.
 * @param {Function} props.onNewMessage - The function to handle sending a new message.
 * @returns {JSX.Element} The chat container component.
 */

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatContainer(props) {
    const [newMessage, setNewMessage] = useState('');

    // Ref for scrolling to the bottom of the chat
    const bottomRef = useRef(null);
    const textAreaRef = useRef(null);
    const messages = props.messages;

    // Input Handling
    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    }

    // Keyboard Handling
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.shiftKey) {
                // If Shift + Enter is pressed, add a new line
                setNewMessage(newMessage + '\n');
            } else {
                // If only Enter is pressed, send the message
                handleSendNewMessage();
            }
        }
    }

    // Sending Messages
    const handleSendNewMessage = () => {
        if (newMessage.trim() !== '') {
            props.onNewMessage(newMessage);
            setNewMessage('');
        }
    }

    // Scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Adjusts textarea height automatically based on content
    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }, [newMessage]);

    return (
        <div className="chatContainer flex flex-col h-screen w-2/3 bg-zinc-100">
            <div className="chatDisplay flex flex-col items-end w-full h-4/5 overflow-auto">
                {/*Displaying messages */}
                {messages.map((message, index) => (
                    <div key={index} className="message mr-6 mb-3 mt-3">
                        <p className='max-w-full break-all px-3 py-2 text-base bg-zinc-300 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl truncate whitespace-normal'>{message}</p>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <div className="chatInput relative w-full h-1/5">
                {/* Input field for typing messages */}
                <div className='flex flex-row items-center min-h-12 h-fit max-h-full pl-4 py-[1px] mr-3 ml-3 border-2 rounded-3xl'>
                    <textarea
                        className='resize-none w-full text-base h-6 bg-zinc-100 focus:outline-none active:outline-none max-h-[calc(20vh-8px)] overflow-x-hidden'
                        placeholder="Here you can type..."
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={newMessage}
                        rows="1"
                        ref={textAreaRef}
                    ></textarea>
                    <button
                        type="Send"
                        className="ml-auto h-12 w-12"
                        onClick={handleSendNewMessage}>
                        <FontAwesomeIcon icon={faPaperPlane}
                            className='align-middle z-20 mr-3'
                            style={{
                                fontSize: 36
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}