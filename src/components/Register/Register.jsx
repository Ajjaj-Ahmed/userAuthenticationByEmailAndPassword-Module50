import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiTwotoneEye } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = e =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const url = e.target.photo.value;
    const accepted = e.target.terms.checked;
    console.log(email,password,accepted,name)

    /* reset Error and success*/
    setRegisterError('')

    setSuccess('');

    /*client site password conditional validation */
    if(password.length<6){
      setRegisterError('Password should be at least 6 characters');
      return
    }
    else if(!/[A-Z]/.test(password)){
      setRegisterError('Your password should have at least one upper case')
      return
    } else if(!accepted){
      setRegisterError('Please accepted our terms and condition')
      return
    }

    
   
    /* email authentication */
    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const user = result.user;
      console.log(user)
      setSuccess('User Create Successfully');

      /* Update Profile */
      updateProfile(user,{
        displayName : name,
        photoURL:url,
      })
      .then(()=>console.log('profile update successfully'))
      .catch()
      /* Send email varification code. */
      sendEmailVerification(user)
      .then(()=>alert('check your email to varify'))

    })
    .catch(error=>{
      const message = error.message;
      setRegisterError(message);
    })
    document.getElementById('nameField').value = ''
    document.getElementById('passField').value = ''
    document.getElementById('emailField').value = ''

    
  }
  return (
    <div className="p-5 w-2/3 mx-auto">
      <div className="max-w-2xl  p-10 mx-auto border-1">
      <h2 className="text-center text-4xl font-semibold text-purple-500 mb-5">Register Yourself !</h2>
      <form className="text-center w-3/5  mx-auto" onSubmit={handleRegister}>

        <input className="border-2 mb-4 py-2 bg-gray-100 rounded-lg  w-full" type="text" name="name" placeholder="Your Name" id="nameField" required/>
        <br />
        <input className="border-2 mb-4 py-2 bg-gray-100 rounded-lg  w-full" type="email" name="email" placeholder="email" id="emailField" required/>
        <br />

        <div className="relative">
        <input 
        className="border-2 py-2 bg-gray-100 rounded-lg w-full" 
        type={showPassword ? "text" : "password"} 
        name="password" 
        placeholder="password" id="passField" required/>
        <br />

        <span className="absolute top-4 right-2" onClick={()=>setShowPassword(!showPassword)} >
          {showPassword ? <AiTwotoneEye /> :<FaEyeSlash />}
        </span>
        </div>

        <input 
         className="border-2 py-2 bg-gray-100 rounded-lg w-full mt-4"
        type="url" name="photo" 
        id="photoField" placeholder="photo url"/>
        <br />

        {/* Terms and condition */}
        <div className="mt-5 flex items-center gap-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">Accept our <Link to='/'>Terms and Conditions</Link></label>
        </div>
        <br />
        <input className="border-2 btn btn-secondary py-2 rounded-lg px-2 w-full" type="submit" value="Submit"  />
      </form>
      <p className="text-center mt-4 text-2xl text-purple-500">Already have account ! Please <Link to="/login">Login</Link></p>

      {/* Conditional rendering for Error*/}
      {registerError && <p className="text-red-900 text-center text-2xl font-medium mt-4">{registerError}</p>}

      {/* conditional rendering for success */}
      {success && <p className="text-green-900 text-center text-2xl font-medium mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default Register;