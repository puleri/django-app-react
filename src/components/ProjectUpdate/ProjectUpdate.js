import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { projectUpdate } from '../../api/project'

const UpdateProject = props => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const [project, setProject] = useState({
    name: ' ',
    completed: false,
    priority: 'Must',
    deadline: date,
    time_estimate: 1,
    description: ' '
  })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props
  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setProject(oldProject => {
      const updatedProject = { ...oldProject, ...updatedField }
      return updatedProject
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    projectUpdate(user, project, match.params.projectId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Project has been edited',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        eading: 'Update failed',
        message: 'Unable to edit at this time. ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to='/projects/'/>
    )
  }

  return (
    <div>
      <h1>Update Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title: </label>
        <input type="text" name="name" id="name" value={project.name} onChange={handleChange} /><br />
        <label htmlFor="completed">Completed: </label>
        <input type="checkbox" id="completed" name="completed" value={project.completed} onChange={handleChange} /><br />
        <label htmlFor="priority">Priority: </label>
        <select id="priority" name="priority" value={project.priority} onChange={handleChange}>
          <option value="Must">Must</option>
          <option value="Should">Should</option>
          <option value="Could">Could</option>
          <option value="Would">Would</option>
        </select><br />
        <label htmlFor="deadline">Deadline: </label>
        <input type="date" id="deadline" name="deadline" value={project.deadline} onChange={handleChange}/><br />
        <label htmlFor="time_estimate">Time Estimate: </label>
        <select id="time_estimate" name="time_estimate" value={project.time_estimate} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select><br />
        <label htmlFor="description">Description: </label><br />
        <textarea name="description" rows="15" cols="35" value={project.description} onChange={handleChange}></textarea><br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/projects/" className="backButton">Back</Link>
    </div>
  )
}
export default UpdateProject
