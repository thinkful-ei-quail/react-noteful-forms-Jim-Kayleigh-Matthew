import "./NotefulForm.css";
import React, { Component } from "react";

class NotefulForm extends Component {
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
      />
    );
  }
}

export default NotefulForm;