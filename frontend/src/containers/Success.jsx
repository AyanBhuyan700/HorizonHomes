import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Success() {
    const navigate = useNavigate();


    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/");
        }, 9000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <>

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold text-green-600">🎉 Payment Successful! 🎉</h1>
                    <p className="text-lg text-gray-700 mt-2">Thank you for your purchase.</p>
                    <p className="text-sm text-gray-500 mt-4">Redirecting you to the homepage...</p>
                </div>
            </div>
        </>
    )
}

export default Success;
