import './Navbar.css';
import user from './img/user.png';
import edit from './img/edit.png';
import inbox from './img/envelope.png';
import settings from './img/settings.png';
import help from './img/question.png';
import logout from './img/log-out.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const menuRef = useOnClickOutside(() => {
        setOpen(false);
    });

    return (
        <div className="navbar-container h-screen w-[50px] bg-zinc-100">
            <div className="menu-trigger w-full mt-2 py-2" onClick={() => { setOpen(!open) }}>
                <FontAwesomeIcon icon={faBars} className='text-3xl w-full' />
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} ref={menuRef} >
                <h3>Patrik<br /><span>A Dog Lover</span></h3>
                <ul>
                    <DropdownItem img={user} text={"My Profile"} />
                    <DropdownItem img={edit} text={"Edit Profile"} />
                    <DropdownItem img={inbox} text={"Inbox"} />
                    <DropdownItem img={settings} text={"Settings"} />
                    <DropdownItem img={help} text={"Helps"} />
                    <DropdownItem img={logout} text={"Logout"} />
                </ul>
            </div>
        </div>
    )
};

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} alt="Profile logo"></img>
            <button> {props.text} </button>
        </li>
    );
}
