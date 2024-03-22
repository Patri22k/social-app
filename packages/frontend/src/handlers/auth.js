const handleAuthLogin = (navigate) => {
    return (data) => {
        if (!data.jwt) {
            return;
        }
        localStorage.setItem("jwt", data.jwt);
        navigate("/app");
    }
}

export { handleAuthLogin }