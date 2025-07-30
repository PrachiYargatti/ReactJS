//index.html
<!doctype html>
<html lang="en">
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
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
  // Write your code here.
  <div className='bg-container'>
    <h1 className='head'>Congratulations</h1>
    <div className='card'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/congrats-card-profile-img.png'
        className='profile_img'
      />
      <h1>Kiran V</h1>
      <p>Vishnu Institute of Computer Education and Technology, Bhimavaram</p>
      <img
        src='https://assets.ccbp.in/frontend/react-js/congrats-card-watch-img.png'
        className='watch_img'
      />
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
  background-image: url('https://assets.ccbp.in/frontend/react-js/congrats-card-bg.png');
  background-size: cover;
  height: 100vh;
  font-family: 'Roboto';
}

.head {
  font-size: 40px;
  color: #0f172a;
  font-family: 'Roboto';
}

.profile_img,
watch_img {
  height: 150px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cffafe;
  border-radius: 5px;
  padding: 25px;
  margin: 10px;
}
