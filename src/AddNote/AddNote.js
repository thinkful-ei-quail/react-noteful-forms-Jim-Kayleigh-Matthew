import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulForm from "../NotefulForm/NotefulForm";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { folders = [] } = this.context;
    const { className, ...otherProps } = this.props;
    this.history = otherProps.history;
    return (
      <>
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
        {this.state.isError && <p>{this.state.errorMsg}</p>}
      </>
    );
  }
}
