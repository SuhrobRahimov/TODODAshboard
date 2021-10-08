import React from "react";
import { useParams } from "react-router";

const NoteItem = ({note}) => {
    return (
        <tr>
            <td>{note.id}</td>
            <td>{note.text}</td>
            <td>{note.userCreated}</td>
            <td>{note.isClosed}</td>
            <td>{note.createdAt}</td>
        </tr>
    )
}

const ProjectNoteList = ({notes}) => {
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
            </thead>
            <tbody>
                {filtered_note.map((note) => <NoteItem note={note} />)}     
            </tbody>   
        </table>
    )
}


export default ProjectNoteList;