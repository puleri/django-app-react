import React, { Component } from 'react'
import FadeIn from 'react-fade-in'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component {
  render () {
    return (
      <div>
        <Carousel className='home-carousel'>
          <Carousel.Item style={{ 'height': '200px' }}>
            <FadeIn>
              <h1 className="logo carousel-header">Zone</h1><br />
              <h3 className="carousel-header">Think creatively and stay in the zone.</h3>
            </FadeIn>
          </Carousel.Item>
          <Carousel.Item>
            <h2 className="carousel-header">Use time buckets, overview cards, and manage your priorities clearly with tested organization tools.</h2>
          </Carousel.Item>
          <Carousel.Item>
            <h4 className="carousel-header">Built by a Musician and Full-Stack Software Engineer, Zone makes the Agile developer workflow to all with the goal of creating more efficent production management.</h4>
          </Carousel.Item>
        </Carousel>
        <div>
          <br />
          <h5 style={{ 'textAlign': 'center', 'margin-top': '50px', 'margin-bottom': '200px' }}><b>Are you an artist? <a style={{ 'color': '#49f2d6' }} href='#sign-up'>Create a free account</a></b></h5>
        </div>
      </div>
    )
  }
}

export default Home
