import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

const Footer = () => {
  return (
    <MDBFooter style={{ 'backgroundColor': 'rgb(117, 97, 90, .8)' }} color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <img className='zone-icon-footer' src={require('../../img/zone-icon.png')}/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer style={{ 'fontSize': '20px' }} fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://puleri.github.io/"> Matthew Puleri </a>
        </MDBContainer>
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
