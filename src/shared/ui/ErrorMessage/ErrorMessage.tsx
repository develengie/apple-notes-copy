import "./ErrorMessage.scss";

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return <h1 className="error-message">{error}</h1>;
};

export default ErrorMessage;
