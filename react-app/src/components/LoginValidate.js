import * as yup from 'yup';

const loginValidate = yup.object().shape({
    username: yup.string()
        .trim()
        .min(3, 'username must be at least three characters long')
        .required('Your username is required'),
    password: yup.string()
        .trim()
        .min(4, 'The password must be at least four characters long')
        .required('The name is a required field'),

});
export default loginValidate