import React, {useState} from 'react';
import { useNavigate  } from "react-router-dom"; 

const ParticipantsSignup = () => {
  const navigate = useNavigate ();
  const [participants, setParticipants] = useState({
    name:"", email:"", pasword:"",cpasword:""
  });

  let name,value;
  const handleInputs = (e) =>{
    name = e.target.name;
    value = e.target.value;

    setParticipants({...participants,[name]:value})
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, pasword, cpasword } = participants;

    const res = await fetch("/participantregister", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, pasword, cpasword
        })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
        window.alert("Invalid credentials");
        console.log("Invalid credentials");
    } else {
        window.alert("Registration successfull");
        console.log("Registration successfull");

        navigate('/lottery');
    }
  }


  return (
    <>
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form class="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input" name='name' placeholder="Name"  autoComplete='off'
                value = {participants.name}
                onChange = {handleInputs} 
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input" name='email' placeholder="Email" autoComplete='off'
                value = {participants.email}
                onChange = {handleInputs} 
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" name='pasword' placeholder="Password" autoComplete='off'
                value = {participants.pasword}
                onChange = {handleInputs} 
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" name='cpasword' placeholder="Confirm Password" autoComplete='off'
                value = {participants.cpasword}
                onChange = {handleInputs} 
                />
              </div>
              <button class="button login__submit" onClick={PostData} >
                <span class="button__text">Sign up Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>




      <button className="btn"><a href='/'>Back</a></button>
    </>
  )
}

export default ParticipantsSignup