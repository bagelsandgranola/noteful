import React from 'react';
import './NotePageSidebar.css';
import NotesContext from './NotesContext';


class NotePageSidebar extends React.Component {

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotesContext;

render() {
  const noteId = this.props.match.params.noteId
  const folders = this.context.folders
  const notes = this.context.notes
  console.log("Context", this.context);
  console.log("notes", notes);
  console.log("folders", folders);
  const selectedNote = notes.find(note => note.id == noteId) || {}
  console.log("selectedNote", selectedNote);
  const selectedNoteFolderId = selectedNote.folderid;
  console.log("selectedNoteFolderId", selectedNoteFolderId);

  const selectedFolder = folders.find(folder => folder.id === selectedNoteFolderId) || {}
  const selectedFolderName = selectedFolder.name

  return (
    <div className="notePageSidebar">
        <h2> {selectedFolderName} </h2>
        <button className="backButton" onClick={() => this.props.history.goBack()}> Go Back </button>
    </div>
  );
}
}

export default NotePageSidebar;