import "./NotefulForm.css";
import React from "react";

function NotefulForm(props) {
  const { className, ...otherProps } = props;
  return (
    <form
    className={['Noteful-form', className].join(' ')}
    action='#'
    {...otherProps}
    />
  );
}

export default NotefulForm;