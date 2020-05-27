import React from 'react';

            //start of my Form\\
export default function Form(props) {

    const {
        values,
        validateChange,
        onSubmit,
        errors,
        onCheckboxChange,
        disabled,
    
    } = props;
    


return (

<form className = 'form container' onSubmit={onSubmit}>
    <div>
        <h2>Registration page </h2>

       
        <h4> User Information</h4>
       {/* rendering validation errors here */}
       <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
       
        </div>
     
      {/* end of validation */}
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

<div> 
        <label>Email&nbsp;

        <input
              name='email'
              type='text'
              value={values.email}
              onChange={validateChange}
         />  
        </label>
 </div>
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
<div> 

    <label>Terms Of Service&nbsp;
    <input
    type='checkbox'
    name='TOS'
    checked={values.TOS}
    onChange={onCheckboxChange}
    // add onChangefunction to app js and call it back later
    />  
    </label>
    </div>

     {/* Submit Button */}

    <button disabled={disabled}> Submit </button>

</div>
</form>

)
}

        //end of my form\\