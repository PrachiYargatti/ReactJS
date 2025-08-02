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
const Notification = props => {
  //  Write your code here.
  const {content, className, imgSrc} = props

  return (
    <div className={`message ${className}`}>
      <img src={imgSrc} alt={`${content} icon`} className='icon' />
      <p>{content}</p>
    </div>
  )
}

const element = (
  //  Write your code here.
  <div className='bg-container'>
    <h1 className='head'>Notifications</h1>
    <div>
      <Notification
        content='Information Message'
        className='info'
        imgSrc='https://assets.ccbp.in/frontend/react-js/primary-icon-img.png'
      />
      <Notification
        content='Success Message'
        className='success'
        imgSrc='https://assets.ccbp.in/frontend/react-js/success-icon-img.png'
      />
      <Notification
        content='Warning Message'
        className='warning'
        imgSrc='https://assets.ccbp.in/frontend/react-js/warning-icon-img.png'
      />
      <Notification
        content='Error Message'
        className='error'
        imgSrc='https://assets.ccbp.in/frontend/react-js/danger-icon-img.png'
      />
    </div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

//index.css
/* Write your code here. */
.bg-container {
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  text-align: center;
  color: #0f172a;
  font-size: 38px;
  font-family: Roboto;
}
.message {
  width: 350px;
  align-items: center;
  border-radius: 6px;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  color: white;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 18px;
}
.info {
  background-color: #0b69ff;
}
.success {
  background-color: #2dca73;
}
.warning {
  background-color: #ffb800;
}
.error {
  background-color: #ff0b37;
}
