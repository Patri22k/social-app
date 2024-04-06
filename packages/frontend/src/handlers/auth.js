const handleAuthLogin = (navigate, revalidate) => {
    return (data) => {
        if (!data.jwt) {
            return;
        }
        localStorage.setItem("jwt", data.jwt);
        revalidate();
        navigate("/app");
    }
}

export { handleAuthLogin }
