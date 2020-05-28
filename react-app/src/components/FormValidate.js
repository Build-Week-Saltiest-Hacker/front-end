import * as yup from 'yup';



//~~~~~~~~~~~~~~~~~~Validation~~~~~~~~~~~~~~~~~~\\

//start of schema\\
const formValidate = yup.object().shape({
        username: yup.string()
                .trim()
                .min(3, 'username must be at least three characters long')
                .required('Your username is required'),
        email: yup.string()
                .email('The email must be a valid email address')
                .required('The email is a required field'),
        password: yup.string()
                .trim()
                .min(4, 'The password must be at least four characters long')
                .required('The name is a required field'),
        TOS: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
});
//end of schema\\
export default formValidate



