import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';


class Sidebar extends React.Component {

static contextType = NotesContext;

render() {

    const folderData = this.context.folders;
    console.log(folderData);

    const folderNav = folderData.map(folder => {
        return (
            <div className="nav_item" folderId={folder.id}> 
                <Link to={`/folder/${folder.id}`}> {folder.name}</Link>
            </div>
        )
    })

  return (
      
    <div className="Sidebar">
        {folderNav}
        <div className="sidebar_controls">
            <button> Add folder </button>
        </div>
    </div>
  )};
}

export default Sidebar;