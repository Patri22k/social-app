import { useUser } from "../../hooks/user";

export default function RestrictedContent({ children }) { // propswithchildren
    const { user, fetching, error } = useUser();

    return ( // TODO: Add default content prop
        <>
            {(user && user != null) ? children : null }
            {fetching ? <p>Authorizing...</p> : null}
            {error ? <p>Error occured: {error}</p> : null}
        </>
    )
}