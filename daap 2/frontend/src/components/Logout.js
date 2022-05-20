import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: "application/json"
            },
            credentials: "include"
        }).then((res) => {
            navigate('/participantsLogin', { replace: true });
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });

    return (
        <div>Logout</div>
    )
}

export default Logout