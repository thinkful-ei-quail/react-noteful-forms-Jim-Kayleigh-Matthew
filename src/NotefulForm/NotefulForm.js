// import React from 'react'
import "./NotefulForm.css";
import React, { Component } from "react";
import ApiContext from '../ApiContext';
//import './';
//import  from './';

class NotefulForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
      },
      noteName: {
        value: '',
      },
      noteContent: {
        value: ''
      },
      validateFolder: {
        value: '',
      },
      validateName:{
        value: '',
      }
    };
  }

  static contextType = ApiContext

  static defaultProps = {
    viewtype: false,
  };

  getFormDetails() {
    if (this.props.viewtype) {
      return this.getNoteInput();
    } else {
      return this.getFolderInput();
    }
  }

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
        <input type="submit" />
      </>
    );
  }

  getNoteInput() {
    const { folders=[] } = this.context
    return (
      <>
        <label htmlFor="noteName">Note Name: </label>
        <input
          type="text"
          defaultValue="My Note Name :-)"
          name="noteName"
          onChange={(e) => this.updateNoteName(e.target.value)}
        />
        <select >
          {folders.map((folder,i) => {
            
              return (
                <option key={i} value={folder.id}>{folder.name}</option>
              )
            })}
        </select>
        <textarea
          defaultValue="My note content"
          name="noteName"
          onChange={(e) => this.updateNoteContent(e.target.value)}
        />
        <input 
        type="submit" 
        name="noteSubmit"
        onClick={(e) => this.submitNote(e)}/>
      </>
    )
  }

  // ValidateFolder= ()=>{
  //   const name=this.
  // }

  validateNote= ()=>{
    const noteName= this.state.noteName.value;
    if (!noteName){
      console.log ('Please enter a name!!!');
    }
  }

  submitNote= (e)=>{
    console.log('submit fired');
    e.preventDefault();
    this.validateNote();

  }


  updateFolderName = (folderName) => {
    this.setState({ folderName: { value: folderName } });
    console.log(this.state.folderName);
  };

  updateNoteName = (noteName) => {
    this.setState({ noteName: { value: noteName } });
  }

  updateNoteContent =(noteContent) =>{
    this.setState({ noteContent: { value: noteContent } });
  }

  render() {
  console.log(this.state.noteName);

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
