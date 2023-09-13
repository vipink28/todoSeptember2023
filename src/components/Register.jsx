import React, { useState } from 'react';

function Register(props) {
    const [formData, setFormData] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`);

        if (checkUser.ok) {
            const user = await checkUser.json();
            if (user.length > 0) {
                setMessage("user already exist");
            } else {
                //fetch function
                const response = await fetch("http://localhost:5000/users", config);
                if (response.status === 201) {
                    setMessage("Registered Successfully");
                } else {
                    setMessage("Something went wrong, please try again.");
                }
                //fetch function
            }
        } else {
            setMessage("something went wrong");
        }




    }

    return (
        <form>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name='name' className='form-control' onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            <button className='btn btn-primary' onClick={submitForm}>Register</button>
            <p className='text-primary fs-4'>{message}</p>
        </form>
    );
}

export default Register;