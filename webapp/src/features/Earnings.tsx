import React, { useEffect, useState } from "react";

type EarningsProps = {
    triggerFetch: number;
  };

const Earnings: React.FC<EarningsProps> = ({ triggerFetch }) => {
    const [earnings, setEarnings] = useState(null)
    const fetchEarnings = async () => {
        try {
            const response = await fetch('http://localhost:8000/earnings')
            if (!response.ok) {
                throw new Error('Network reponse was not ok')
            }
            const data = await response.json()
            setEarnings(data)
        } catch(error) {
            console.error('Error fetching earnings data', error)
        }
    }
    useEffect(() => {
        fetchEarnings();
    }, [triggerFetch])

    return (
    <div>
        Earnings: {earnings}
    </div>
    )
}

export default Earnings 
