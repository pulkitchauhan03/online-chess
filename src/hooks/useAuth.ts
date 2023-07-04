import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
    const username = localStorage.getItem("username");

    return ({username})
}

export const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}
