import { Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import authApi from '../../api/apis/authApi';

export default function VerifyAccount() {
    const { token } = useParams();
    const [isVerified, setIsVerified] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        verifyAccount();
    }, [token])

    useEffect(() => {
        setIsVerified(false);
        localStorage.removeItem("code_400")
    }, [JSON.parse(localStorage.getItem("code_400"))])


    const verifyAccount = async () => {
        setIsLoading(true)
        const data = {
            user_verify_token: token
        }
        try {
            const reponse = await authApi.verifyAccount(data);

            if (JSON.parse(localStorage.getItem("code_400"))) {
                setIsVerified(false)
                localStorage.removeItem("code_400")
            } else {
                setIsVerified(true)
            }

            setIsLoading(false)
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        isLoading
            ? <Typography.Title level={4} style={{ textAlign: 'center', marginTop: "100px" }}>Waiting.....</Typography.Title>
            : <div>
                {isVerified === true
                    ? <div style={{ textAlign: 'center', marginTop: "100px", display: "flex", flexDirection: "column" }} >
                        <Typography.Title level={3}>Your account is verified ^^</Typography.Title>
                        <Typography.Text >You can login now!</Typography.Text>
                    </div>

                    : <div style={{ textAlign: 'center', marginTop: "100px", display: "flex", flexDirection: "column" }} >
                        <Typography.Title level={2}>Something Wrong :(</Typography.Title>
                        <Typography.Text>Your request may be wrong or expired!</Typography.Text>
                        <Typography.Text>Contact administrator for more information!</Typography.Text>
                    </div>
                }
            </div>
    )
}
