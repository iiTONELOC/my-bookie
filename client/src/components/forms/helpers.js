import { validateEmail } from '../../utils/validateEmail';
const isFormValidated = (formState) => {
    if (formState) {
        if (formState.email && formState.password) {
            const isEmailValid = validateEmail(formState.email);
            if (isEmailValid) {
                if (formState.password.length >= 8) return true;
                else return false;
            } else return false;
        } else return false;
    } else return false;
};

export default isFormValidated;