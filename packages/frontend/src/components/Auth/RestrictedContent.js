// Import the custom hook 'useUser' from the hooks directory
import { useUser } from "../../hooks/user";

// Define a functional component 'RestrictedContent' that takes 'children' as a prop
export default function RestrictedContent({ children }) {
    // Call the 'useUser' hook and destructure its returned values into 'user', 'fetching', and 'error'
    const { user, fetching, error } = useUser();

    // Return a JSX fragment
    return (
        <>
            {/* If 'user' is truthy, render the 'children'; otherwise, render 'null' */}
            {(user && user != null) ? children : null}
            {/* If 'fetching' is true, render a paragraph with the text "Authorizing..."; otherwise, render 'null' */}
            {fetching ? <p>Authorizing...</p> : null}
            {/* If 'error' is truthy, render a paragraph with the text "Error occurred: " followed by the error message; otherwise, render 'null' */}
            {error ? <p>Error occured: {error}</p> : null}
        </>
    )
}
