import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa o CSS do react-toastify

const useToast = (msg, status = "success") => {
    if (status === "success") {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    } else if (status === "error") {
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    }
};

export default useToast;
