import React from 'react';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';
import NoteError from './NoteError';

class NewNote extends React.Component {

    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    static contextType = NotesContext;


handleSubmit = e => {

    e.preventDefault();
    const note = {
        name: e.target['note-name'].value,
        folderid: e.target['folder-id'].value,
        content: e.target['note-content'].value,
        modified: "2019-01-03T00:00:00.000",
        //id: "",

    }

    fetch('https://mysterious-bastion-24704.herokuapp.com/api/notes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(note),
    })
    .then(res => {
      if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(res => {
          console.log("res.body.id", res.id)
          this.context.addNote({ 
                ...note,
                id: res.id
            })
          this.props.history.push(`/folder/${note.folderid}`)
      })
      .catch(error => {
          console.error({error})
      })
}
 
render() {

    const folderOptions = this.context.folders.map(folder => {
        return <option value={folder.id}> {folder.name} </option>
    })

  return (
    <NoteError>
      <div className="formSection">
        <h2> Create Note </h2>
        <form className="addNoteForm" onSubmit={this.handleSubmit}>
            <label htmlFor="note-name">Note name</label>
            <input type="text" name="note-name" placeholder="Enter note name" required></input>
            <label htmlFor="folder-id">Select folder:</label>
            <select name ="folder-id">
                {folderOptions}
            </select>
            <textarea rows="4" cols="50" name="note-content"> Enter note here</textarea>
            <button>Save</button>
        </form>
        </div>
        </NoteError>
  );
}
}

NewNote.propTypes = 
    {
        value: PropTypes.number
    }

export default NewNote;