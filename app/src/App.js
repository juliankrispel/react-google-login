import React, { useState, useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = () => {
    window.gapi.auth2.getAuthInstance().signIn()
  }

  const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut()
  }

  useLayoutEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '1070376588031-05ijh61ldm33i1dt6bqvk6snp3sdl035.apps.googleusercontent.com'
      })
      .then((googleAuth) => {
        setIsLoggedIn(googleAuth.isSignedIn.get())
        googleAuth.isSignedIn.listen((_isLoggedIn) => setIsLoggedIn(_isLoggedIn))
        setIsLoading(false)
      })
    })
  }, [])

  console.log({ isLoading, isLoggedIn })

  if (isLoading) {
    return <div>Loading</div>
  }
  if (!isLoggedIn) {
    return <button onClick={signIn}>Sign In</button>
  }

  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default App;
