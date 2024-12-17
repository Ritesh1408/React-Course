
import './App.css'
import Card from './components/Card'


function App() {

  // const myObj = {
  //   name: 'John Doe',
  //   age: 25,
  // }

  // const myArr = [1, 2, 3, 4, 5]
  
  return (
    <>
      <div className='text-4xl bg-blue-500 rounded-md text-center text-white p-4'>
        Fashion Club
      </div>
      <Card username = "code" btnText = "Add cart"/>
      <Card username = "code" btnText = "Add Value"/>
      

    </>
  )
}

export default App
