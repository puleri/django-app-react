import React, { Component } from 'react'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component {
  render () {
    return (
      // <Container className="landing-body">
      <Carousel className='home-carousel'>
        <Carousel.Item style={{ 'height': '300px' }}>
          <h1 className="logo carousel-header">Zone</h1><br />
          <h3 className="carousel-header">Think creatively and stay in the zone.</h3>
        </Carousel.Item>
        <Carousel.Item>
          <h2 className="carousel-header">Use time buckets, overview cards, and manage your priorities clearly with tested organization tools.</h2>
        </Carousel.Item>
        <Carousel.Item>
          <h4 className="carousel-header">Built by a Musician and Full-Stack Software Engineer, Zone makes the Agile developer workflow to all with the goal of creating more efficent production management.</h4>
        </Carousel.Item>
      </Carousel>
      // </Container>
    )
  }
}

export default Home
