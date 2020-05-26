import React from 'react';

            //start of my Form\\
export default function Login(props) {

    const {
        values,
        validateChange,
        onSubmit,
        errors,
        onCheckboxChange,
        disabled,
        onLogin,
    
    } = props;
    


return (

<form className = 'form container' onLogin={onLogin}>
    <div>
        <h2>Login page </h2>
 {/* rendering validation errors here */}
 <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
       
        </div>
     
      {/* end of validation */}
       
        <h4> Login Information</h4>
{/* name  */}
<div> 
        <label> UserName&nbsp;
            <input
            name='username'
            type='text'
            value={values.username}
            onChange={validateChange}
            placeholder='Your user name here..'
        
            
            /> 
         </label>
 </div>

{/* email */}

{/* not needed  
*/}
{/* password */}
<div> 
        <label>Password&nbsp;

        <input
            name='password'
            type='password'
            value={values.password}
            onChange={validateChange}
         
         />  
    </label>
 </div>
{/* TOS */}
{/* not needed */}
     {/* Submit Button */}

    <button disabled={disabled}> Login </button>

</div>
</form>

)
}

        //end of my form\\