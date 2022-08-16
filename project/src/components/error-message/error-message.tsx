import React from 'react';
import '../error-message/error-message.css';

type ErrorMessageProps = {
  errorMessage: string | null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) =>
  errorMessage ?
    <div className="error__message horizontal-shake">{errorMessage}</div>
    : null;

export default ErrorMessage;
