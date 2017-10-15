import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'; 

export default class App extends React.Component{

  onError(error){
    console.log(error)
  }

  constructor(props) {
    super(props);
    this.state = {
            user: {
              firstname: "niko",
              lastname: 'dunk',
              dobday: '20',
              dobmonth: '01',
              dobyear: '1988',
              referrer: 'george',
              email: 'n.dunkel@gmail.com',
              phone: '9177043031',
              },
              loggedIn: false
            }
      
  }

  componentDidMount() {
    
  } 


  render(){
    return (
                  
          <div>
              { !this.state.loggedIn ?
            <div>
              <p style={{color: "lightgrey", fontSize: "small"}}>WellBeing: A simple patient referral service</p>
              { !this.state.firstname ? <h1>Hi! What is your name?</h1> : null}
              { this.state.firstname ? <h1>Hi, {this.state.firstname}!</h1> : null}
              <form>
                first name<br />
                <input
                  autoFocus
                  type="text"
                  onChange={this.handleUsernameChange('firstname').bind(this)}
                  value={this.state.firstname}
                /><br /><br />
                last name<br />
                <input
                  type="text"
                  value={this.state.lastname}
                /><br /><br />
                birthday<br />
                <input
                  type="date"
                  value={this.state.dobyear}
                /><br /><br />
                email<br />
                <input
                  type="email"
                  value={this.state.email}
                />
                <input
                  className="submitButton"
                  type="submit"
                  class="btn btn-success"
                  value="Let's Go!"
                  onClick={this.handleUsernameSubmit.bind(this)} />
              </form>
            </div>
            : null
          }
              { this.state.loggedIn ?
                <Results />
                : null
              }
            </div>
    )
  }

    handleUsernameChange () {
      return function (e) {
        var state = {};
        state.firstname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        this.setState({firstname: state.firstname});
      }.bind(this);

    }




    handleUsernameSubmit(e) {
        e.preventDefault();
        console.log(this.state.user)

        $.ajax({
          type: "POST",
          url: 'http://www.hackhealthcare-personalized.info:3000/login',
          data: this.state.user,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.results = data
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        this.setState({
            loggedIn: true
          })
        
      }



}




class Results extends React.Component{

  results = [
        {
          id: '9403930493f',
          type: 'Nephrologist',
          name: 'Dr. Nice Person', 
          address: '680 Haight Street', 
          phone: '9177043031'
        },
        {
          id: 'o2394kljl',
          type: 'Onconephrologist',
          name: 'Dr. Steven George', 
          address: '250 George Street', 
          phone: '930450375'
        }
        ]

  componentDidMount() {

    $.ajax({
      type: "GET",
      url: 'https://localhost:3000/results&id=3',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.results = data
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    console.log(this.results)
  }



  render(){

    return (
      <div>
      <h1>Nephrologists in your area</h1>
      <button style={{display: 'inline'}} class="btn btn-default"><span class="glyphicon glyphicon-remove"></span> Location: within 1 mile of your home</button> &nbsp;
      <button style={{display: 'inline'}} class="btn btn-default"><span class="glyphicon glyphicon-remove"></span> Insurance: covered by Aetna</button>
        <div style={{paddingTop: 50}}>
          {this.results.map(result => (
            <div key={result.id} style={{maxWidth: 900}}>
              <div style={{float: 'right'}}>
                <iframe style={{border:0}} src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBz8soRKrBNMALn5zTxtH2grSVPbi2nSK4 
                  &q=Space+Needle,Seattle+WA" allowfullscreen>
                </iframe>
              </div>
              <div >
                <h4>{result.name}</h4>
                <p>{result.type}</p>
                <p>{result.address}</p>
                <p>Languages: English</p>
                <p>{result.phone}</p><br />
                <button class="btn btn-success"><span class="glyphicon glyphicon-check"></span> Get referral</button> &nbsp;
                <button class="btn btn-secondary"><span class="glyphicon glyphicon-star"></span></button>
              </div>
              <hr />
            </div>


          ))}
        </div>
        
      </div>
    )
  }
}




ReactDOM.render(<App />, document.getElementById('root'));



