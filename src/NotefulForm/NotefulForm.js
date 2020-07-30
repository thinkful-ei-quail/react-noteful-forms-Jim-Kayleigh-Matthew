// import React from 'react'
import "./NotefulForm.css";
import React, { Component } from "react";
//import './';
//import  from './';

//import './';
//import  from './';

class NotefulForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: "",
      },
      noteNote: {
        value: "",
      },
      validateFolder: {
        value: "",
      },
    };
  }

  static defaultProps = {
    viewtype: false,
  };

  getFolderInput() {
    return (
      <>
        <label htmlFor="folderName">Folder Name: </label>
        <input
          type="text"
          defaultValue="MyFolderName"
          name="folderName"
          onChange={(e) => this.updateFolderName(e.target.value)}
        />
      </>
    );
  }

  getFormDetails() {
    if (this.props.viewtype) {
      return this.getNoteInput();
    } else {
      return this.getFolderInput();
    }
  }

  getNoteInput() {
    return <h3>THIS WILL BE A NOTE INPUT</h3>;
  }

  // ValidateFolder= ()=>{
  //   const name=this.
  // }
  updateFolderName = (folderName) => {
    this.setState({ folderName: { value: folderName } });
    console.log(this.state.folderName);
  };
  render() {
    // fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: { }
    //}
    // })
    const { className, ...otherProps } = this.props;

    return (
      <div className="container">
        <form className={["Noteful-form", className].join(" ")} action="#">
          {this.getFormDetails()}

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NotefulForm;

/* Removed otherProps to avoid DOM error with viewtype
<form
          className={["Noteful-form", className].join(" ")}
          action="#"
          {...otherProps}
        >
          {this.getFormDetails()}

          <input type="submit" />
        </form>*/
