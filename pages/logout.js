import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

function logout() {

    const router = useRouter();

    useEffect(() => {
        localStorage.clear();
        router.push('/login')
    }, [])

    return (
        <div>
            Logging out...
        </div>
    )
}

export default logout
