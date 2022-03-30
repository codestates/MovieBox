import '../App.css'

const Signup = () => 
    <div className='signup'>
      <body>
        <h2>Sign Up</h2>
        <div>
          <input type="text" placeholder="email"></input>
        </div>
        <div>
          <input type="text" placeholder="name"></input>
        </div>
        <div>
          <input type="text" placeholder="password"></input>
        </div>
        <div>
          <input type="text" placeholder="conform password"></input>
        </div>
        <div>
          <input type="text" placeholder="nickname"></input>
        </div>
        <div>
          <button>signup</button>
        </div>
        <div>이미 아이디가 있으신가요? <a href="/login">login</a></div>
      </body>
    </div>

export default Signup;