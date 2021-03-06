import React from 'react';
import './NoteList.css';
import NoteListItem from './NoteListItem';
import NotesContext from './NotesContext';
import { Link } from 'react-router-dom';
import NoteError from './NoteError';


class NoteList extends React.Component {

    static contextType = NotesContext;

render() {


    const noteData = this.context.notes;
    console.log("noteData", noteData);

    const folderData = this.context.folders;
    console.log("folderData", folderData);

    var noteListItems= [];

    if(this.props.selectedFolder === "" && this.props.selectedNote === "")
    {
        noteListItems = noteData.map(note => {
            return (
            <NoteListItem 
            title={note.name}
            dateModified={note.modified}
            folderId={note.folderid}
            id={note.id}
            content={note.content}></NoteListItem>
            )
        })
        console.log("all", noteListItems)
        console.log("context notes", this.context.notes)
    }
    else if (this.props.selectedNote === "")
    {
        const selectedFolder = this.props.selectedFolder;
        noteListItems = noteData.filter(function(note) {
            console.log("note.folderid", note.folderid)
            console.log("selectedFolder", selectedFolder)
            return (note.folderid == selectedFolder)
        }).map(note => {
            return (
            <NoteListItem 
            title={note.name}
            dateModified={note.modified}
            folderId={note.folderid}
            id={note.id}
            content={note.content}></NoteListItem>
            )
        })
        console.log("filtered", noteListItems)
    }
    else 
    {
        const selectedNote = this.props.selectedNote;
        console.log("selectedNote", selectedNote);
        noteListItems = noteData.filter(function(note) {
            return (note.id === selectedNote)
        }).map(note => {
            return (
            <NoteListItem 
            title={note.name}
            dateModified={note.modified}
            folderId={note.folderid}
            id={note.id}
            content={note.content}></NoteListItem>
            )
        })
    }

  return (
    <div className="noteList">
    <NoteError>
    <div>
        {noteListItems}
    </div>
    </NoteError>
        <Link to="/NewNote">
        <button> Add note </button>
        </Link>
    </div>
  );
}
}

export default NoteList;