import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      fetch(`${config.API_ENDPOINT}/folder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${this.state.folderName.value}`,
        }),
      })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((res) => {
        this.context.addFolder();
        this.setState({
          redirect: "/",
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          errorMsg: error.message
        })
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
        <NotefulForm onSubmit={(e) => this.submitFolder(e)}>
          <label htmlFor="folderName">Folder Name: </label>
          <input
            type="text"
            placeholder="MyFolderName"
            name="folderName"
            onChange={(e) => this.updateFolderName(e.target.value)}
          />
          <input type="submit" name="folderSubmit" />
        </NotefulForm>
        {this.state.isError && <p>{this.state.errorMsg}</p>}
      </>
    );
  }
}

AddFolder.propTypes = {
  className: PropTypes.string
}