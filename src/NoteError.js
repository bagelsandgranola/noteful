import React from 'react';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';

class NoteError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        return { hasError: true};
    }

render() {
    if (this.state.hasError) {
        return (
            <h2> Something went wrong. We are working on fixing it. Please check back later. </h2>
        )
    }
    return this.props.children  
    }
}



export default NoteError;