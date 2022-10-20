import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom"

// STEPS TO CREATING A REACT FORM THAT USES A POST REQUEST 
// 1) We are going to need to store some data (username, password)

// 2) A fetch method that actually goes and sends along our authentication info through a POST request. 

// 3) We will need an actual form in our return statement. 
    // Be sure to use the actual <form> tag to accomplish this. 
    // Be sure to put your onSubmit event listener onto the opening form tag itself. 


const Homepage = () => {
    // step 1
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    // const navigate = useNavigate(); 


    // step 3
    function handleUsernameChange (event) {
        console.log(event.target.value)
        setUsername(event.target.value); 
    }

    // step 3
    function handlePasswordChange(event) {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    // step 2
    async function setRegisterInfo (event) {
        event.preventDefault(); 
        try {
            const response = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            });

            const data = await response.json(); 
            console.log("This was our request's returned promise: ", data)

            localStorage.setItem("token", data.data.token);

            // navigate("/profile")
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div>
            <h1>Login Form</h1>
            {/* step 3 */}
            <form onSubmit={setRegisterInfo}>
                <label>Username</label>
                <input type="text" value={username} onChange={handleUsernameChange}></input>

                <label>Password</label>
                <input type="password" value={password} onChange={handlePasswordChange}></input>
                
                {/* Q: What if you want to let users see the password?
                A: Write a button with a callback function that changes the type attribute back to a text input
                <button onClick={}>Show Password</button> 
                */}
                <button type="submit">Login To Account</button>
            </form>
        </div>
    )
}

ReactDOM.render(<Homepage />, document.getElementById("app")); 