import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'

// fetch(`${config.API_ENDPOINT}/folders/`, {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json'
//   },
// })
export default class AddFolder extends Component {
  render () {
    return (
      <>
        <h1>Some text in the add folder</h1>
        <NotefulForm />
      </>
    )
  }
}