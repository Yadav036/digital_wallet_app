import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react";
import axios from "axios";



export const Dashboard = () => {

  const [balance, setBalance] = useState(0);

useEffect(() => {
  axios.get("http://localhost:3000/api/v1/account/balance", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }).then(response => {
    setBalance(response.data.balance);
  }).catch(err => {
    console.error("Error fetching balance:", err);
  });
}, []);

    return <div>
        <Appbar />
        <div className="m-8">
        <Balance value={balance.toFixed(2)} />

            <Users />
            

        </div>
    </div>
}
