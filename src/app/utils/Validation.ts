export interface ValidationErrors {
    ws_employee_id?: string;
    ws_security_question?: string;
    ws_answer?: string;
    ws_password?: string;
}

export const validateForm = (formData: {
    ws_employee_id: string;
    ws_security_question: string;
    ws_answer: string;
    ws_password: string;
}): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (formData.ws_employee_id.length !== 5) {
        errors.ws_employee_id = 'Employee ID must be exactly 5 characters';
    }

    if (!formData.ws_security_question.trim()) {
        errors.ws_security_question = 'Security question is required';
    }

    if (!formData.ws_answer.trim()) {
        errors.ws_answer = 'Answer is required';
    }

    if (formData.ws_password.length < 8 || !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.ws_password)) {
        errors.ws_password = 'Password must be at least 8 characters and contain both letters and numbers';
    }

    return errors;
};