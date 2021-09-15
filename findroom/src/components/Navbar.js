
import styled from "styled-components";
import { Link } from 'react-router-dom'
const Nav=styled.div`
.navbar-nav {
    margin-left: auto !important;
  }
  .nav-link {
    font-weight: 500;
  }
  .navbar-brand {
    font-size: 2.25rem;
    font-weight: 700;
    color: #59ab6e !important;
  }
  .navbar {
    background-color: white !important;
  }
  .nav-icons > i {
    margin-right: 10px;
  }

`
const Navbar=(props)=>{

  const handleLogout = () => {
    console.log("dfdfmkdf")
    localStorage.clear()
    console.log(props)
    props.setUser(null)
  }

 let navdata,navdata1,navdata2;
 console.log(localStorage.getItem("id"))
 console.log(props.user)

if(props.user===null)
{
navdata= <Link className="nav-link" to={'/login'}> Login</Link>;
navdata1= <Link className="nav-link" to={'/register'}> Register</Link>
}
else{
navdata= <Link className="nav-link" to={'/'} onClick={handleLogout}>Logout</Link>
navdata1=  <Link className="nav-link" to={'/watch'}>FavoriteList</Link>
// console.log(props.user.person)
if(localStorage.getItem("person")==1)
{
  navdata2=<Link className="nav-link" to={'/landlord'}>CreateHouse</Link>
}

}

return(
    <Nav>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to={"/"}>findHouse</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">About</Link>
          </li>
          <li className="nav-item">
            {navdata2}
          </li>
          <li className="nav-item">
        {navdata1}
            </li>
         
            <li className="nav-item">
         
           {navdata}
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
  </Nav>
)

}

export default Navbar;

