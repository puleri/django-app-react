import React, { useState } from 'react'
import { createTask, taskIndex } from '../../api/project'
import Form from 'react-bootstrap/Form'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withRouter, Link } from 'react-router-dom'
import { css } from 'glamor'

const ProjectTasks = props => {
  // console.log('props are ', props)
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const [task, setTask] = useState({
    name: '',
    completed: false,
    deadline: date,
    priority: 'Must',
    time_estimate: 1,
    description: ''
  })
  const [tasks, setTasks] = useState([])
  const { user, match, msgAlert } = props
  console.log('msgAlert is ', msgAlert)
  // console.log('user is ', user)
  // useEffect(() => {
  //   // createTask(task, user)
  //   //   // .then(console.log('user is', user))
  //   //   .then(response => {
  //   //     setTask(response.data)
  //   //   })
  //   // .then(props => {
  //   //
  //   // })
  // }, [])

  const handleChange = (event) => {
    setTask({
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    createTask(user, task, match.params.projectId)
      .then(response => {
        setTask({
          createdId: response.data._id
        })
      })
      .then(props => {
        // console.log('user is', props.user)
        taskIndex(props.user)
          .then(res => {
            setTasks({ tasks: res.data })
          })
      })
      .then(() => setTask({ task: {
        name: '',
        completed: false,
        priority: 'Must',
        deadline: date,
        time_estimate: 1,
        description: ' '
      } }))
      .then(() => setTask(true))
      .then(() => msgAlert({
        heading: 'Creation successful',
        message: 'Task has been created',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Creation failed',
        message: 'Unable to create at this time. ' + err.message,
        variant: 'danger'
      }))
  }
  const tasksList = tasks.map(task => (
    <div key={`${task.id}`}>
      <Card style={task.completed ? greenStyles : blueStyles} className="project-cards">
        <h5>{task.name}</h5>
        <h6>{task.deadline}</h6>
        <p className="project-card-description">{task.description}</p>
        <div className="row">
          <button className="projectDetail col-6" id="delete-project" name={task.id} onClick={this.onProjectDelete}>Delete</button>
          <Link className="projectDetail col-6" to={'/update/' + task.id + '/'}>Update</Link>
        </div>
      </Card>
    </div>
  ))

  const greenStyles = {
    'background-color': 'rgb(158, 193, 217, .7)',
    'padding': '15px',
    'margin-top': '20px',
    'margin': '15px',
    'margin-bottom': '40px'
  }
  const blueStyles = {
    'background-color': 'rgb(217, 205, 158, .7)',
    'padding': '15px',
    'margin-top': '20px',
    'margin': '15px',
    'margin-bottom': '40px'
  }
  const style = {
    Submit: {
      backgroundColor: 'rgb(247, 239, 208, .8)',
      color: 'rgb(117, 97, 75)',
      borderRadius: '5px',
      border: 'none',
      ':hover': {
        textDecoration: 'none',
        color: 'rgb(117, 97, 75)',
        backgroundColor: 'rgb(252, 241, 197, 1)',
        border: 'none'
      }
    }
  }

  return (
    <div>
      <h1>Hi</h1>
      <Form onSubmit={handleSubmit} className="createProject">
        <div className="row">
          <div className="col-12">
            <br />
            <h3>New Task</h3>
          </div>
          <div className="col-10">
            <Form.Label htmlFor="title">Task Title:</Form.Label>
            <Form.Control type="text" name="name" id="name" value={task.name} onChange={handleChange} />
          </div>
          <div className="col-4">
            <Form.Label htmlFor="deadline">Deadline:</Form.Label>
            <Form.Control type="date" id="deadline" name="deadline" value={task.deadline} onChange={handleChange}/>
          </div>
          <div className="col-4">
            <Form.Label htmlFor="time_estimate">Time Estimate:</Form.Label>
            <Form.Control as="select" id="time_estimate" name="time_estimate" value={task.time_estimate} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </div>
          <div className="col-4">
            <Form.Label htmlFor="priority">Priority:</Form.Label>
            <Form.Control className="col-4" as="select" size="sm" id="priority" name="priority" value={task.priority} onChange={handleChange} custom>
              <option value="Must">Must</option>
              <option value="Should">Should</option>
              <option value="Could">Could</option>
              <option value="Would">Would</option>
            </Form.Control>
          </div>
          <div className="col-12">
            <Form.Label htmlFor="description">Description:</Form.Label><br/>
            <Form.Control as="textarea" name="description" rows="3" cols="35" value={task.description} onChange={handleChange}></Form.Control><br />
          </div>
        </div>
        <Button {...css(style.Submit)} type="submit">Submit</Button>
        <br />
        <CardColumns type="text">
          {tasksList}
        </CardColumns>
      </Form>
    </div>
  )
}

export default withRouter(ProjectTasks)
