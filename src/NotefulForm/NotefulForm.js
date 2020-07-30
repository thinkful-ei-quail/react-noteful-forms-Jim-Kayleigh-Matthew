// import React from 'react'
import './NotefulForm.css'
import React, { Component } from 'react'
//import './';
//import  from './';

//import './';
//import  from './';


class NotefulForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      folderName : {
            value:""
        },
      noteNote : {
          value:""
        },
      validateFolder: {
          value: "",
        }
    };
  }

// ValidateFolder= ()=>{
//   const name=this.
// }
updateFolderName= (folderName)=>{    
 
  this.setState(
    {folderName: {value: folderName}}
  ) 
  console.log(this.state.folderName)
}
  render() {



    // fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    // })
    const { className, ...otherProps } = this.props

    return(
    <div className='container'>
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      > 
        <label htmlFor="folderName">Folder Name: </label>
        <input 
          type="text" 
          defaultValue="MyFolderName" 
          name="folderName"
          onChange={e => this.updateFolderName(e.target.value)}
        >
        </input>
      
        <input type="submit"></input>
      </form> 
    </div>
    );
  }
}

export default NotefulForm

