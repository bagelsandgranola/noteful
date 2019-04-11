import React from 'react';
import './NoteList.css';
import NoteListItem from './NoteListItem';

class NoteList extends React.Component {


render() {

    
    const data = this.props.data;
    console.log(data);

    const noteData = this.props.data.notes;
    console.log(noteData);

    const folderData = this.props.data.folders;
    console.log(folderData);

    var noteListItems= [];

    if(this.props.selectedFolder === "" && this.props.selectedNote === "")
    {
        noteListItems = noteData.map(note => {
            return (
            <NoteListItem 
            title={note.name}
            dateModified={note.modified}
            folderId={note.folderId}
            id={note.id}
            content={note.content}></NoteListItem>
            )
        })
        console.log("all", noteListItems)
    }
    else if (this.props.selectedNote === "")
    {
        const selectedFolder = this.props.selectedFolder;
        noteListItems = noteData.filter(function(note) {
            return (note.folderId === selectedFolder)
        }).map(note => {
            return (
            <NoteListItem 
            title={note.name}
            dateModified={note.modified}
            folderId={note.folderId}
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
            folderId={note.folderId}
            id={note.id}
            content={note.content}></NoteListItem>
            )
        })
    }

  return (
    <div className="noteList">
    <div>
        {noteListItems}
    </div>

        <button> Add note </button>
    </div>
  );
}
}

export default NoteList;