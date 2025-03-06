import { useApp } from "@/stores/useApp"
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

function ClientProtect({ children }: { children: JSX.Element }) {
    const { user } = useApp();
    const navigate = useNavigate()
    if (user?.role !== "client") {
        navigate("/");
    }
    return children;
}

export default ClientProtect