import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";

// fetch(`${config.API_ENDPOINT}/folders/`, {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json'
//   },
// })
export default class AddFolder extends Component {
  render() {
    return (
      <>
        <NotefulForm history={this.props.history} />
      </>
    );
  }
}
