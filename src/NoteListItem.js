import React from 'react';
import './NoteListItem.css';
import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';

class NoteListItem extends React.Component {

static contextType = NotesContext;

deleteNoteRequest(noteId, cb){
    fetch(`https://mysterious-bastion-24704.herokuapp.com/api/notes` + `/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
            },
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
        return res.json()
    })
    .then (data => {
        cb(noteId)
    })
    .catch(error => {
        console.error(error)
    })
}

render() {

    

    const year = this.props.dateModified.substring(0, 4);

    const month = this.props.dateModified.substring(5, 7);

    const day = this.props.dateModified.substring(9, 10);

  return (
      <NotesContext.Consumer>
          { (context) => (

          
    <div className="noteListItem">
        <div className="note_info">
            <Link to={`/note/${this.props.id}`} className="note_title">{this.props.title}</Link><br></br>
            <p className="note_dateModified"> Last modified on {month}/{day}/{year} </p>
        </div>
        <div className="note_controls">
        <button 
        onClick={() => {
            this.deleteNoteRequest(this.props.id, context.deleteNote)
        }} 
        className="note_deleteButton">Delete Note</button>
        </div>
    </div>
          )}
    </NotesContext.Consumer>
  );
}
}
/*
<NoteListItem 
title={note.name}
dateModified={note.modified}
folderId={note.folderId}
id={note.id}
content={note.content}></NoteListItem>
*/

export default NoteListItem;