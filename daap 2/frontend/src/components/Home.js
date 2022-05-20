import React from 'react'
import "../App.css"

const Home = () => {
  return (
    <>
      <div className='hmain'>
        <div className='hleft' >
          Manager
          <button className="btn"><a href='/managerlogin' >Login</a></button>
        </div>
        <div className='hright'>
          Participants
          <div className='hparti' >
            <button className="btn"><a href='/participantslogin' >Login</a></button>
            <button className="btn"><a href='/participantssignup' >Sing up</a></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home