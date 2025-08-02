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
const Box = props => {
  const {content, className} = props
  return (
    <div className={`box ${className}`}>
      <p className='paragraph'>{content}</p>
    </div>
  )
}

const element = (
  <div className='bg-container'>
    <h1 className='head'>Boxes</h1>
    <div className='card'>
      <Box content='Small' className='small' />
      <Box content='Medium' className='medium' />
      <Box content='Large' className='large' />
    </div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

//index.css
/* Write your code here. */
.bg-container {
  margin: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  margin: 10px;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.small {
  height: 50px;
  width: 50px;
  background-color: #fbbf24;
}
.medium {
  height: 100px;
  width: 100px;
  background-color: #38bdf8;
}
.large {
  height: 150px;
  width: 150px;
  background-color: #ec4899;
}
.paragraph {
  color: white;
  font-family: Bree Serif;
}
.head {
  text-align: center;
  font-size: 38px;
  color: #0f172a;
  font-family: Roboto;
}
