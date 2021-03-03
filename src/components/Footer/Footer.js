import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

const Footer = () => {
  return (
    <MDBFooter style={{ 'backgroundColor': 'rgb(117, 97, 90, .8)' }} color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol>
            <img className='zone-icon-footer' src={require('../../img/zone-icon.png')}/>
          </MDBCol>
          <MDBCol>
            <MDBContainer style={{ 'fontSize': '12px', 'fontFamily': 'Gruppo' }} fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://puleri.github.io/"> Matthew Puleri </a>
            </MDBContainer>
          </MDBCol>
          <MDBCol style={{ 'fontSize': '12px', 'fontFamily': 'Gruppo' }}>
            <a className="footer-a" href="https://github.com/puleri/django-app-react/issues">support</a>
            <a className="footer-a" href="https://github.com/puleri">github</a>
            <a className="footer-a" href="https://puleri.github.io/">about</a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer footer-copyright text-center py-3">
        <div>
        </div>
      </div>
    </MDBFooter>
  )
}

// <MDBCol md="6">
//   <h5 className="title">Links</h5>
//   <ul>
//     <li className="list-unstyled">
//       <a href="#!">Link 1</a>
//     </li>
//     <li className="list-unstyled">
//       <a href="#!">Link 2</a>
//     </li>
//     <li className="list-unstyled">
//       <a href="#!">Link 3</a>
//     </li>
//     <li className="list-unstyled">
//       <a href="#!">Link 4</a>
//     </li>
//   </ul>
// </MDBCol>

export default Footer
