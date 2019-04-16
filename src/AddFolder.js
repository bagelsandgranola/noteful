import React from 'react';
import './AddFolder.css';
import NotesContext from './NotesContext';
import NoteError from './NoteError';

class AddFolder extends React.Component {

    static defaultProps = {
        history: {
          push: () => { }
        },
      }
      static contextType = NotesContext;

handleSubmit = e => {

    e.preventDefault();
    const folder = {
        name: e.target['folder-name'].value
    }

    fetch('http://localhost:9090/folders', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(folder),
    })
    .then(res => {
      if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
          this.context.addFolder(folder)
          this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
          console.error({error})
      })
}
 
render() {

  return (
    <NoteError>
      <div className="formSection">
        <h2> Create Folder </h2>
        <form className="addFolderForm" onSubmit={this.handleSubmit}>
            <label htmlFor="folderName">Folder name</label>
            <input type="text" name="folder-name" placeholder="Enter folder name"></input>
            <button>Save</button>
        </form>
        </div>
    </NoteError>
  );
}
}

export default AddFolder;