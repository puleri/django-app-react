import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { projectUpdate, showProject } from '../../api/project'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateProject = props => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const [project, setProject] = useState({
    name: '',
    completed: false,
    deadline: date,
    priority: 'Must',
    time_estimate: 1,
    description: ''
  })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props
  // console.log('props are ', props)
  // console.log(project.findOne(props.match.params.projectId))
  useEffect(() => {
    // console.log('match.params', match.params)
    showProject(user, match.params.projectId)
      .then(res => {
        // console.log('res', res)
        setProject(res.data)
        // console.log('project and res.data.project are', project, res.data.project)
      })
      .catch(err => { console.log(err) })
  }, [])
  // const [projectToUpdate] = useState()
  // const handleCheck = (event) => {
  //   if (event.target.checked) {
  //     console.log('box is checked')
  //     setState(
  //       project.completed = false
  //     )
  //   } else {
  //     console.log('box is unchecked')
  //     setState(
  //       project.completed = true
  //     )
  //   }
  // }
  const handleChange = (event) => {
    if (event.target.name === 'completed') {
      setProject(oldProject => {
        return { ...oldProject, completed: !oldProject.completed }
      })
    } else {
      const updatedField = { [event.target.name]: event.target.value }
      setProject(oldProject => {
        const updatedProject = { ...oldProject, ...updatedField }
        return updatedProject
      })
    }
  }
  // const onCheck=((event)=>(
  //   let checked=event.target.checked;
  //   setProject()
  // ))
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
  console.log('project is ', project)
  return (
    <div>
      {project ? (
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <h3>Update project</h3>
            </div>
            <div className="col-10">
              <Form.Label htmlFor="title">Project Title: </Form.Label>
              <Form.Control type="text" name="name" id="name" value={project.name} onChange={handleChange} />
            </div>
            <div className="col-2">
              <Form.Label htmlFor="completed">Completed: </Form.Label>
              <Form.Control type="checkbox" id="completed" name="completed" checked={project.completed ? 'checked' : ''} onChange={handleChange} /><br />
            </div>
            <div className="col-4 ">
              <Form.Label htmlFor="priority">Priority: </Form.Label>
              <Form.Control as="select" id="priority" name="priority" value={project.priority} onChange={handleChange}>
                <option value="Must">Must</option>
                <option value="Should">Should</option>
                <option value="Could">Could</option>
                <option value="Would">Would</option>
              </Form.Control>
            </div>
            <div className="col-4">
              <Form.Label htmlFor="deadline">Deadline: </Form.Label>
              <Form.Control type="date" id="deadline" name="deadline" value={project.deadline} onChange={handleChange}/><br />
            </div>
            <div className="col-4">
              <Form.Label htmlFor="time_estimate">Time Estimate: </Form.Label>
              <Form.Control as="select" id="time_estimate" name="time_estimate" value={project.time_estimate} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </div>
            <div className="col-12">
              <Form.Label htmlFor="description">Description: </Form.Label><br />
              <Form.Control as="textarea" name="description" rows="15" cols="35" value={project.description} onChange={handleChange}></Form.Control><br />
            </div>
          </div>
          <Button type="submit">Submit</Button>
          <Link to="/projects/" className="backButton">Back</Link>
        </Form>
      ) : 'Loading...'}
    </div>
  )
}
export default UpdateProject
