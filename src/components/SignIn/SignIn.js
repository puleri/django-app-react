import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { css } from 'glamor'

const style = {
  Submit: {
    color: 'rgb(247, 239, 208)',
    backgroundColor: 'rgb(117, 97, 75, .8)',
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

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/projects'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div style={{ 'fontFamily': 'Gruppo' }} className="full-screen col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Sign in</h3>
        <Form className="updateForm" onSubmit={this.onSignIn}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            {...css(style.Submit)}
            variant="danger"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(SignIn)
