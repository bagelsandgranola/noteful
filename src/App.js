import React from 'react';
import Header from './Header';
import NoteList from './NoteList';
import Sidebar from './Sidebar';
import './App.css';
import NOTES from './dummy-store';
import { Route } from 'react-router-dom';
import NotePageSidebar from './NotePageSidebar';
import Note from './Note';

class App extends React.Component {

  state = {
    notes: NOTES,
  }

  render() {
    return (
    <div className='App'>
      <header>
        <Header></Header>
      </header>
      <Route
        exact
        path='/'
        render={ () => 
          <main>
            <div className="body">
              <Sidebar data={this.state.notes} className="Sidebar"></Sidebar>
              <NoteList selectedFolder="" selectedNote="" data={this.state.notes} className="List"></NoteList>
            </div>
          </main>} 
      />

      <Route
        path='/folder/:folderId'
        render={ (props) => 
          <main>
            <div className="body">
              <Sidebar data={this.state.notes} className="Sidebar"></Sidebar>
              <NoteList selectedFolder={props.match.params.folderId} selectedNote="" data={this.state.notes} className="List"></NoteList>
            </div>
          </main> }

        />

        <Route
          path='/note/:noteId'
          render={ props => {
            
            const { noteId } = props.match.params
            const { notes } = this.state.notes.notes
            const {folders} = this.state.notes.folders

            const selectedNote = this.state.notes.notes.find( note => note.id === noteId)
            const selectedFolderId = selectedNote.folderId;
            const selectedFolder = this.state.notes.folders.find(folder => folder.id === selectedFolderId).name

          return (
            <main>
              <div className="body">
       
                  <NotePageSidebar className="Sidebar" selectedFolder={selectedFolder}></NotePageSidebar>
                  <Note selectedNote={props.match.params.noteId} data={this.state.notes} className="List"></Note>

              </div>

          </main> ) }
          }
          />
      
    </div>
    )};
}

export default App;

/* props.match.params.poemId */