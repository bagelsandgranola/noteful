import React from 'react';
import './NoteListItem.css';
import { Link } from 'react-router-dom';

class NoteListItem extends React.Component {
render() {

    const year = this.props.dateModified.substring(0, 4);

    const month = this.props.dateModified.substring(5, 7);

    const day = this.props.dateModified.substring(9, 10);
//                <a href={`/folder/${folder.id}`}> {folder.name}</a>

  return (
    <div className="noteListItem">
        <div className="note_info">
            <Link to={`/note/${this.props.id}`} className="note_title">{this.props.title}</Link><br></br>
            <p className="note_dateModified"> Last modified on {month}/{day}/{year} </p>
        </div>
        <div className="note_controls">
        <button className="note_deleteButton">Delete Note</button>
        </div>
    </div>
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