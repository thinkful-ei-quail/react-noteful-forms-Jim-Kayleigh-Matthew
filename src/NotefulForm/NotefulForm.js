// import React from 'react'
import "./NotefulForm.css";
import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import { Redirect } from "react-router-dom";
//import './';
//import  from './';

class NotefulForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: "",
      },
      noteName: {
        value: "",
      },
      noteContent: {
        value: "",
      },
      folderId: {
        value: "",
      },
      isError: false,
      errorMsg: "",
      redirect: null,
    };
  }

  static contextType = ApiContext;

  static defaultProps = {
    viewtype: false,
    match: {
      params: {},
    },
  };

  getFormDetails(className) {
    if (this.props.viewtype) {
      return this.getNoteInput(className);
    } else {
      return this.getFolderInput(className);
    }
  }

  getFolderInput(className) {
    return (
      <form
        onSubmit={(e) => this.submitFolder(e)}
        className={["Noteful-form", className].join(" ")}
        action="#"
      >
        <label htmlFor="folderName">Folder Name: </label>
        <input
          type="text"
          placeholder="MyFolderName"
          name="folderName"
          onChange={(e) => this.updateFolderName(e.target.value)}
        />
        <input type="submit" name="folderSubmit" />
      </form>
    );
  }

  getNoteInput(className) {
    const { folders = [] } = this.context;
    return (
      <form
        className={["Noteful-form", className].join(" ")}
        action="#"
        onSubmit={(e) => this.submitNote(e)}
      >
        <label htmlFor="noteName">Note Name: </label>
        <input
          type="text"
          placeholder="My Note Name :-)"
          name="noteName"
          onChange={(e) => this.updateNoteName(e.target.value)}
        />
        <select onChange={(e) => this.updateFolderContent(e.target.value)}>
          <option>Select Folder</option>
          {folders.map((folder, i) => {
            return (
              <option key={i} value={folder.id}>
                {folder.name}
              </option>
            );
          })}
        </select>
        <textarea
          placeholder="My note content"
          name="noteName"
          onChange={(e) => this.updateNoteContent(e.target.value)}
        />
        <input type="submit" name="noteSubmit" />
      </form>
    );
  }

  // ValidateFolder= ()=>{
  //   const name=this.
  // }

  validateFolder = () => {
    const folderName = this.state.folderName.value;
    if (!folderName) {
      this.setState({
        isError: true,
        errorMsg: "Folder name is required",
      });
      return false;
    }
    return true;
  };

  validateNote = () => {
    const noteName = this.state.noteName.value;
    const folderId = this.state.folderId.value;
    if (!noteName || !folderId) {
      console.log("Please enter a name!!!");
      this.setState({
        isError: true,
        errorMsg: "Note name is required.",
      });
      return false;
    }
    return true;
  };

  submitNote = (e) => {
    e.preventDefault();
    this.setState({ isError: false, errorMsg: "" });
    const modifiedDate = Date.now();
    console.log(this.state);
    if (this.validateNote()) {
      //make api call
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${this.state.noteName.value}`,
          folderId: `${this.state.folderId.value}`,
          content: `${this.state.noteContent.value}`,
          modified: `${modifiedDate}`,
        }),
      }).then((response) => {
        this.context.addNote();
        this.setState({
          redirect: "/",
        });
      });
    }
  };

  submitFolder = (e) => {
    e.preventDefault();
    this.setState({ isError: false, errorMsg: "" });
    if (this.validateFolder()) {
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${this.state.folderName.value}`,
        }),
      }).then((res) => {
        this.context.addFolder();
        this.setState({
          redirect: "/",
        });
      });
    }
  };

  updateFolderName = (folderName) => {
    this.setState({ folderName: { value: folderName } });
    console.log(this.state.folderName);
  };

  updateNoteName = (noteName) => {
    this.setState({ noteName: { value: noteName } });
  };

  updateNoteContent = (noteContent) => {
    this.setState({ noteContent: { value: noteContent } });
  };

  updateFolderContent = (folderId) => {
    this.setState({ folderId: { value: folderId } });
  };

  render() {
    console.log(this.state.noteName);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { className, ...otherProps } = this.props;
    this.history = otherProps.history;
    return (
      <div className="container">
        {this.state.isError && <p>{this.state.errorMsg}</p>}
        {this.getFormDetails(className)}
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
