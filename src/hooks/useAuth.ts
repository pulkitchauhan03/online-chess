const useAuth = () => {
    const username = localStorage.getItem("username");

    return ({username})
}

export default useAuth;