import RestrictedContent from "../Auth/RestrictedContent";
import './Navbar.css';
import user from './img/user.png';
import edit from './img/edit.png';
import inbox from './img/envelope.png';
import settings from './img/settings.png';
import help from './img/question.png';
import logout from './img/log-out.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from "react-cool-onclickoutside";
import { useState, useEffect, useRef } from 'react';

export default function ChatPage(props) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const menuRef = useOnClickOutside(() => {
        setOpen(false);
    });

    const handleLogout = (e) => {
        navigate('/');
    };

    const handleSearch = (e) => {
        return
    };

    const [newMessage, setNewMessage] = useState('');

    // Ref for scrolling to the bottom of the chat
    const bottomRef = useRef(null);
    const textAreaRef = useRef(null);
    const messages = props.messages;

    /* Input Handling
     * const handleInputChange = (event) => {
     *     setNewMessage(event.target.value);
     * }
     */

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
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Adjusts textarea height automatically based on content
    useEffect(() => {
        if (!textAreaRef.current) {
            return;
        }
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }, [newMessage]);

    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('jwt');
            try {
                const response = await fetch(`http://localhost:5000/users?name=${searchTerm}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, [searchTerm]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsEmpty(value === '')
    };

    const [isEmpty, setIsEmpty] = useState(true);

    return (
        <RestrictedContent>
            <div className="flex flex-row">
                <div className="navbar h-screen w-[50px]">
                    <div className="grid menu-trigger w-full mt-2 py-2 gap-y-3">
                        <FontAwesomeIcon icon={faBars} onClick={() => { setOpen(!open) }} ref={menuRef} className='text-3xl w-full' />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-3xl w-full' onClick={handleSearch} />
                    </div>
                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} ref={menuRef} >
                        <h3>Patrik<br /><span>A Dog Lover</span></h3>
                        <ul>
                            <DropdownItem img={user} text={"My Profile"} />
                            <DropdownItem img={edit} text={"Edit Profile"} />
                            <DropdownItem img={inbox} text={"Inbox"} />
                            <DropdownItem img={settings} text={"Settings"} />
                            <DropdownItem img={help} text={"Helps"} />
                            <DropdownItem img={logout} text={"Logout"} onClick={handleLogout} />
                        </ul>
                    </div>
                </div>
                <div className="chatHistory h-screen w-[calc(33%-50px)] border-x-2">
                    <div>
                        <div className={`${isEmpty ? 'border-b-2' : 'border-hidden'}`}> 
                            <h2 className="text-3xl mt-7 mb-10 ml-4">Search</h2>
                            <div className="flex items-center rounded mx-4 mb-5 h-10 bg-gray-200">
                                <textarea 
                                    className="w-full mx-3 text-base resize-none h-[24px] truncate bg-gray-200 overflow-x-hidden focus:outline-none active:outline-none" 
                                    placeholder="Search for a chat..."
                                    value={searchTerm}
                                    name="searchTerm"
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        {searchTerm && users.filter(user => user.name.startsWith(searchTerm)).map(user => (
                            <div key={user.id} className="my-2 ml-4">
                                {user.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatContainer flex flex-col h-screen w-2/3">
                    <div className="chatDisplay flex flex-col items-end w-full h-4/5 overflow-auto">
                        {/*Displaying messages */}
                        {messages && messages.map((message, index) => (
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
                                className='resize-none w-full text-base h-6 focus:outline-none active:outline-none max-h-[calc(20vh-8px)] overflow-x-hidden'
                                placeholder="Here you can type..."
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                name="newMessage"
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
            </div>
        </RestrictedContent>
    )
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} alt={props.text}></img>
            <button onClick={props.onClick}> {props.text} </button>
        </li>
    );
}
