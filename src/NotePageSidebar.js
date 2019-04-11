import React from 'react';
import './NotePageSidebar.css';

class NotePageSidebar extends React.Component {

render() {

  return (
    <div className="notePageSidebar">
        <h2> {this.props.selectedFolder} </h2>
        <button className="backButton"> Go Back </button>
    </div>
  );
}
}

export default NotePageSidebar;