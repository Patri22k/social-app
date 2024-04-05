const handleAuthLogin = (navigate, revalidate) => {
    console.log('handleAuthLogin called');
    return (data) => {
        console.log('jwt exists: ', 'jwt' in data);
        console.log('data: ', data.jwt);
        if (!data.jwt) {
            return;
        }
        localStorage.setItem("jwt", data.jwt);
        revalidate();
        navigate("/app");
    }
}

export { handleAuthLogin }
