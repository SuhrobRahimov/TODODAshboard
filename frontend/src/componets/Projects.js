import React from "react";
import { Link } from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`/projects/note/${project.id}`} replace>{project.name}</Link></td>
            <td>{project.url}</td>
            <td>{project.users}</td>
            <td><button type='button' onClick={() => deleteProject(project.id)}>Del</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <thead>
                <th>ProjectID</th>
                <th>Name</th>
                <th>URL</th>
                <th>ActiveUsers</th>
                <th>Action</th>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}        
            </tbody>
        </table>
    )
}


export default ProjectList;