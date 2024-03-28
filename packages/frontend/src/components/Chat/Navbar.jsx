import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Navbar() {
    // TODO: add Menu Bar 
    const handleMenuBar = () => {
        const options = ['Go to LogIn', 'Create Another Account', 'Switch Accounts'];
        const defaultOption = options[0];
        return (
            <Dropdown
                options={options}
                onChange={this._onSelect}
                value={defaultOption}
            />
        )
    };

    return (
        <div className="h-screen w-[50px] bg-zinc-100">
            <button
                onClick={handleMenuBar}
                value={value}
                className="w-full mt-3"
            >
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
        </div>
    )
};
