//index.html
<!doctype html>
<html lang="en">
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap"
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
const element = (
  //   Write your code here.
  <div className='bg-container'>
    <h1 className='head'>Super Over League</h1>
    <div>
      <img src='https://assets.ccbp.in/frontend/react-js/rcb-img.png' />
      <img src='https://assets.ccbp.in/frontend/react-js/csk-img.png' />
    </div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

//index.css
/* Write your code here. */
.bg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
  background-size: cover;
  height: 100vh;
}
.head {
  color: #f8fafc;
  font-family: 'Roboto';
}

