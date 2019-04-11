import React from 'react';
import NoteListItem from './NoteListItem';
import './Note.css';

class Note extends React.Component {

render() {

    const noteData = this.props.data.notes;

    const selectedNoteId = this.props.selectedNote;
        console.log("selectedNote", selectedNote);
        const noteListItems = noteData.filter(function(note) {
            return (note.id === selectedNoteId)
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
//  const selectedNote = this.state.notes.notes.find( note => note.id === noteId)

    const selectedNote = noteData.find(note => note.id === selectedNoteId)

  return (
    <div className="note">
        <div>
            {noteListItems}
       </div>

       <div className="content">
            {selectedNote.content}
       </div>
    </div>
  );
}
}

export default Note;