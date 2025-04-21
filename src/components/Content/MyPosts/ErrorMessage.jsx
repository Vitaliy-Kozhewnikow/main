import React from "react";

const ErrorMessage = ({message , onRetry}) => { 
    <div className="error-message">
    <h3>Error: {message}</h3>
    <button onClick={onRetry}>Try Again</button>
  </div>
}

export default ErrorMessage;