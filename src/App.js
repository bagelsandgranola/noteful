import React from 'react';
import Header from './Header';
import NoteList from './NoteList';
import Sidebar from './Sidebar';
import './App.css';
import NOTES from './dummy-store';
import { Route } from 'react-router-dom';
import NotePageSidebar from './NotePageSidebar';
import Note from './Note';
import NotesContext from './NotesContext'
import AddFolder from './AddFolder';
import NewNote from './NewNote';
import NoteError from './NoteError';

class App extends React.Component {

  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {

    console.log("componentDidMount")
    fetch('https://mysterious-bastion-24704.herokuapp.com/api/folders')
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then (data => {
      this.setState({
        folders: data,
      })
      console.log(this.state.folders);
    })
    .catch(error => {
      console.log("folder retreival error", error)
    })

    //notes 
    fetch('https://mysterious-bastion-24704.herokuapp.com/api/notes')
    .then (res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then (data => {
      this.setState({
        notes: data,
      })
    })
    .catch(error => {
      console.log("notes retreival error", error)
    })

    //setState

  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id != noteId)
    console.log("newNotes on delete", newNotes)
    this.setState({
      notes: newNotes,
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
      ...this.state.folders,
      folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    }
    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <Header></Header>
          </header>
      <div>
        <Route
          exact
          path='/'
          render={ () => 
            <main>
               <NoteError>
                  <div className="body">
                    <Sidebar  className="Sidebar"></Sidebar>
                    <NoteList selectedFolder="" selectedNote="" className="List"></NoteList>  
                  </div>
                </NoteError>
            </main>} 
        />

      <Route
        path='/folder/:folderId'
        render={ (props) => 
          <main>
            <NoteError>
            <div className="body">
              <Sidebar className="Sidebar"></Sidebar>
              <NoteList selectedFolder={props.match.params.folderId} selectedNote=""  className="List"></NoteList>
            </div>
            </NoteError>
          </main> }

        />

        <Route
          path='/addFolder'
          component={AddFolder}
        />

        <Route
          path='/NewNote'
          component={NewNote}
        />

        <div className="body">

          <div className="Sidebar">
          <Route
            path='/note/:noteId'
            component={NotePageSidebar} 
            />
          </div>

          <div className="List">
            <Route
            path='/note/:noteId'
            component={Note} 
            />
          </div>
        </div>

          {/*
          render={ props => {
          return (
            <main>
              <div className="body">
       
                  <NotePageSidebar className="Sidebar"></NotePageSidebar>
                  <Note className="List"></Note>

              </div>

          </main> ) }
          }
          */
        }
        </div>
    </div>
       </NotesContext.Provider>
    )};
}

export default App;