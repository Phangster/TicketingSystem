 <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Contact Number"
             type="contact"
             floatingLabelText="Contact"
             onChange = {(event,newValue) => this.setState({contact:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>