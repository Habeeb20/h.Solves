import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const signup = async ({ fullname,email, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullname, email, username, password, confirmPassword, gender });
		if (!success) {
			setError("please fill in all fields")
		};

		setLoading(true);
		setError(null)
		try {
			const res = await fetch(`${import.meta.env.VITE_API}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, email, username, password, confirmPassword, gender }),
			});
			
			const data = await res.json();
			navigate("/login")
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			navigate("/signup")
		} catch (error) {
			toast.error(error.message);
			setError(error.message)
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup, error };
};
export default useSignup;

function handleInputErrors({ fullname, email, username, password, confirmPassword, gender }) {
	if (!fullname || !email || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
