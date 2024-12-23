
const Header = (props) => {
  console.log(props);

  return (
    <h1>{props.course}</h1>

  )
}

// const Content = (props) => {
//   console.log(props);

//   return (
//     <>
//       <p>{props.part1} {props.exercises1}</p>
//       <p>{props.part2} {props.exercises2}</p>
//       <p>{props.part3} {props.exercises3}</p>
//     </>
//   )
// }


const Part = (props) => {

  return (
    <p>{props.part} {props.exercise}</p>
  )
}



const Content = (props) => {

  return (
    <div>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </div>
  )

}

const Total = (props) => {
  console.log(props);

  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  // const course = 'Half Stack application development'
 
  // const t  = [1,2,3,4]
  // const m1 = t.map(value =>  '<li>' + value + '</li>')
  // console.log(m1)



  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

// 1.3
 
      // const part1  = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }

  // const part2  = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }

  // const part3  = {
  //   name: 'State of a component',
  //   exercises: 14
  // }


// 1.4

  // const parts = [

    

      
  //         {
  //         name: 'Fundamentals of React',
  //         exercises: 10
  //         } ,

  //         {
  //         name: 'Using props to pass data',
  //         exercises: 7
  //         },
  //         {
  //         name: 'State of a component',
  //         exercises: 14
  //         }
  // ]

  // return (
  //   <div>
  //     <Header course={course} />
  //     <Content part1={parts[0].name} exercises1={parts[0].exercises}
  //       part2={parts[1].name} exercises2={parts[1].exercises}
  //       part3={parts[2].name} exercises3={parts[2].exercises} />
  //     <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />

  //   </div>

  // )



  // 1.5

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      } ,

      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises:  14

      } 
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content part1={course.parts[0].name} exercises1={course.parts[0].exercises}
        part2={course.parts[1].name} exercises2={course.parts[1].exercises}
        part3={course.parts[2].name} exercises3={course.parts[2].exercises} />
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />

    </div>

  )



}

export default App