import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const [error, setError] = useState(null);

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) {
			setError("please fill in all fields")
		};
		setLoading(true);
		setError(null)
		try {
			const res = await fetch(`${import.meta.env.VITE_API}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			toast.success("successfully logged in")
		} catch (error) {
			console.log(error)
			setError(error.message)
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login, error };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
