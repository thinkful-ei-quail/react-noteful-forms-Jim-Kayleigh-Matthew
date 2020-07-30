import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    >
      <label htmlFor="folderName">Folder Name: </label>
      <input type="text" defaultValue="MyFolderName" name="folderName"></input>
      <input type="submit"></input>
    </form>
  )
}
