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

class App extends React.Component {

  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    console.log("componentDidMount")
    //folders http://localhost:9090/folders
    fetch('http://localhost:9090/folders')
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
    fetch('http://localhost:9090/notes')
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

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      //deleteNote: this.deleteNote
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
              <div className="body">
                <Sidebar  className="Sidebar"></Sidebar>
                <NoteList selectedFolder="" selectedNote="" className="List"></NoteList>
              </div>
            </main>} 
        />

      <Route
        path='/folder/:folderId'
        render={ (props) => 
          <main>
            <div className="body">
              <Sidebar className="Sidebar"></Sidebar>
              <NoteList selectedFolder={props.match.params.folderId} selectedNote=""  className="List"></NoteList>
            </div>
          </main> }

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