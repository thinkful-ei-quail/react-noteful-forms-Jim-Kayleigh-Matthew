import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import ApiContext from '../ApiContext';
import NotefulForm from "../NotefulForm/NotefulForm";
import config from '../config';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { className, ...otherProps } = this.props;
    this.history = otherProps.history;
    return (
      <>
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
        {this.state.isError && <p>{this.state.errorMsg}</p>}
      </>
    );
  }
}
