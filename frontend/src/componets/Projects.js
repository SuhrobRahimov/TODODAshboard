import React from "react";
import { Link } from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`note/${project.id}`}>{project.name}</Link></td>
            <td>{project.url}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <thead>
                <th>ProjectID</th>
                <th>Name</th>
                <th>URL</th>
                <th>ActiveUsers</th>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}        
            </tbody>
        </table>
    )
}


export default ProjectList;