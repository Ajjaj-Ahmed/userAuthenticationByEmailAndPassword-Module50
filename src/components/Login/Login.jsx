import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [login, setLogin] = useState('');
  //const [userData, setUserData] = useState();
  const [failLogin, setFailLogin] = useState('');
  const emailRef = useRef(null)

  

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //console.log(email,password)

    setLogin('')
    setFailLogin('')

    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        const {displayName,photoURL} = user;

        if(user.emailVerified){
          setLogin('User logged in successfull');
        }else{
          setLogin('kindly varified your email')
        }
      
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFailLogin(errorMessage);
        //console.log(errorMessage);
      });
      document.getElementById('passField').value = ''
      document.getElementById('emailField').value = ''

      
  }

  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
      console.log('type email first');
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log('check again your email');
      return;
    }
    //send validation email
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      alert('please check your email')
    })
    .catch(error=>{
      alert(error)
    })
    
  }
  return (
    <div>
      <div className="w-2/3 border-3 mx-auto">
        <h2 className="text-3xl text-center mb-3">Please Login</h2>
        <form onSubmit={handleLogin} className="text-center w-3/5  mx-auto">
          <input
            className="border-2 mb-4 py-2 bg-gray-100 rounded-lg  w-full"
            type="email" name="email"
            ref={emailRef}
            placeholder="email"
            id="emailField" required />
          <br />
          <div>
            <input
              className="border-2 py-2 bg-gray-100 rounded-lg w-full"
              type="password"
              name="password"
              placeholder="password" id="passField" required />
            <p onClick={handleForgetPassword} className="text-left mt-2">Forget Password?</p>
          </div>
          
          <br />
          <input className="border-2 btn btn-secondary py-2 rounded-lg px-2 w-full" type="submit" value="LogIn" />
        </form>
        <p className="text-center mt-4 text-2xl text-purple-500">New here ! please <Link to="/register">Register first</Link></p>
      </div>
      {
        login && <p className="text-green-600 mt-5 text-center">{login}</p>
      }
      {
        failLogin && <p className="text-red-600 mt-5 text-center">Fail to login</p>
      }
    </div>
  );

}
export default Login
  