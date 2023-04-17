import React, { useEffect, useState } from 'react';

const FormNotification = ({
    message = "",
    alertClass = '', show = '',
}) => {
    const [showDiv, setShowDiv] = useState(show);

    useEffect(() => {
        const timer = setTimeout(() => setShowDiv('db'), 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [showDiv]);

    const notification = () => {
        return <div className={`alert ${alertClass} ${show} `}   >
                {message}
                </div>
    }

    return (
         showDiv ? notification() : null 
    )
}
export default FormNotification;