//index.html
<!doctype html>
<html lang="en">
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="index.css" />
    <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="./index.js"></script>
  </body>
</html>

//index.js
const Button = props => {
  //  Write your code here.
  const {className, buttonText} = props
  return <button className={`button ${className}`}>{buttonText}</button>
}

const element = (
  //  Write your code here.
  <div className='bg-container'>
    <h1 className='head'>Social Buttons</h1>
    <div className='button_container'>
      <Button buttonText='Like' className='like_button' />
      <Button buttonText='Comment' className='comment_button' />
      <Button buttonText='Share' className='share_button' />
    </div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

//index.css
/* Write your code here. */

.bg-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  align-items: center;
  margin: 0;
  background-image: url('https://assets.ccbp.in/frontend/react-js/social-buttons-bg.png');
  background-size: cover;
  height: 100vh;
}
.head {
  color: white;
  font-family: Bree Serif;
  font-size: 36px;
  margin-bottom: 20px;
}
.button_container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
.button {
  font-family: Roboto;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
}
.like_button {
  background-color: #eab308;
  color: white;
}

.comment_button {
  background-color: #ffffff;
  color: black;
}

.share_button {
  background-color: #1d4ed8;
  color: white;
}
