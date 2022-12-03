import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import { api } from '../../util/constant';
export default function Login() {
    const router = useRouter()


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = () => {
        axios.post(`${api}/login`, { username, password }, { withCredentials: true })
            .then(res => {
                router.push(`/`)
            }).catch((err) => console.log('Failed to login'));
    }

    return (

        <div className='position-relative login-container'>
            <div className="center-div  border shadow  rounded  " style={{ maxWidth: "700px" }}>
                <div className='text-center row  shadow rounded  bg-light'>
                    <div className="col-md-12 p-2 h1 mt-3 mb-3 text-center ">Login</div>
                    <div className="col-md-4 p-2">Username</div>
                    <div className="col-md-6 p-2"><input type="text" placeholder=' username' value={username} onChange={(e) => { setUsername(e.target.value) }} className="form-control" required /></div>
                    <div className="col-md-4 p-2">password</div>
                    <div className="col-md-6 p-2"><input type="password" placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" required /></div>
                    <div className="col-md-12 p-3 text-center"><button className="btn btn-light shadow border" onClick={handleSubmit}>Login</button></div>
                </div>
            </div>
        </div>
    )
}


