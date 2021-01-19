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
          <h1 className="carousel-header">Zone</h1><br />
          <p className="carousel-header">Think creatively and stay in the zone.</p>
        </Carousel.Item>
        <Carousel.Item>
          <h3 className="carousel-header">Use time buckets, overview cards, and manage your priorities clearly with tested organization tools.</h3>
        </Carousel.Item>
        <Carousel.Item>
          <h5 className="carousel-header">Built by a Musician and Full-Stack Software Engineer, Zone makes the Agile developer workflow to all with the goal of creating more efficent production management.</h5>
        </Carousel.Item>
      </Carousel>
      // </Container>
    )
  }
}

export default Home
