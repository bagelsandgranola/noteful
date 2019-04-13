import React from 'react';
import NoteListItem from './NoteListItem';
import './Note.css';
import NotesContext from './NotesContext';


class Note extends React.Component {
 
    static contextType = NotesContext;

render() {

    const noteData = this.context.notes
    console.log("Context", this.context);
    console.log("Context - notes ", noteData);

    const selectedNoteId = this.props.match.params.noteId;
        console.log("selectedNoteId", selectedNoteId);
        const noteListItems = noteData.filter(function(note) {
            console.log("filter ran");
            console.log("note.id", note.id);
            console.log("selectedNoteId", selectedNoteId);
            console.log(noteListItems);
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

    const selectedNote = noteData.find(note => note.id === selectedNoteId) || {}

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