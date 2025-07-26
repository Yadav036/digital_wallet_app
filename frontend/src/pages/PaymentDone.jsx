import { useLocation, Link } from "react-router-dom";

export const PaymentDone = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const balance = searchParams.get("balance");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-80 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful ✅</h1>
        <p className="text-gray-700 mb-2">From: <span className="font-semibold">{from}</span></p>
        <p className="text-gray-700 mb-2">To: <span className="font-semibold">{to}</span></p>
        <p className="text-gray-700 mb-4">New Balance: <span className="font-semibold">₹{balance}</span></p>
        <Link
          to="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};
