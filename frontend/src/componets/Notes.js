import React from "react";
import { useParams } from "react-router";

const NoteItem = ({note, closeNote}) => {
    return (
        <tr>
            <td>{note.id}</td>
            <td>{note.text}</td>
            <td>{note.userCreated}</td>
            <td>{note.isClosed}</td>
            <td>{note.createdAt}</td>
            <td><button type='button' onClick={() => closeNote(note.id)}>Close</button></td>
        </tr>
    )
}

const ProjectNoteList = ({notes, closeNote}) => {
    let { id } = useParams()

    let filtered_note = notes.filter((note) => note.project === parseInt(id))

    return (
        <table>
            <thead>
                <th>ID</th>
                <th>Text</th>
                <th>User Create</th>
                <th>Is Closed?</th>
                <th>Create</th>
                <th>Action</th>
            </thead>
            <tbody>
                {filtered_note.map((note) => <NoteItem note={note} closeNote={closeNote}/>)}     
            </tbody>   
        </table>
    )
}


export default ProjectNoteList;