import React, { useRef } from 'react'
import { client } from '../../lib/api';


function create() {

    const ref = useRef();

    const handleUpload = async function (e) {
        console.log(ref.current.files[0]);
        const file = new FormData();
        file.append('file', ref.current.files[0])
        await client.post('/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
        <div>
            <input
                ref={ref}
                type="file"
                onChange={handleUpload}
                name="file"
            />
        </div>
    )
}

export default create
