import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
  
    setGood(good + 1)
      
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  // const total = good + neutral + bad
  // const average = (good - bad) / total
  // const positive = (good / total) * 100




  const StatisticLine = ({ text, value }) => (
    // <p>
    //   {text} {value}
    // </p>
    
      
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
     
    
    
  )


  const DisplayStatistics = ({data}) => {

    
    return (
      <table>
        <tbody>
          {data.map((stat, index) => (
            <StatisticLine key={index} text={stat.text} value={stat.value} />
          ))}
        </tbody>
      </table>
    )
    
  }



  const Statistics = ({ good, neutral, bad }) => {
   
    const total = good + neutral + bad
    const average = total === 0 ? 0 : (good - bad) / total
    const positive = total === 0 ? 0 : (good / total) * 100




   const stat = [
      {text: 'good', value: good},
      {text: 'neutral', value: neutral},
      {text: 'bad', value: bad},
      {text: 'all', value: total},
      {text: 'average', value: average},
      {text: 'positive', value: positive}
   ]

    

   
   
    if (total === 0) { 
      return (
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
      )
    }

    return (
      <div>
        <h1>statistics</h1>
        {/* <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p> */}
{/* 
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
         */}

        <DisplayStatistics data={stat} />

            
                 
      </div>
    )
  }


  const Button = ({ HandleClick, text }) => (
    <button onClick={HandleClick}>
      {text}
    </button>
  )





  
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]
     
    const [selected, setSelected] = useState(0) ;
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) ;

    const handleVote = () => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
      console.log(copy);
      
    }


    const highestVotes = Math.max(...votes);
    const mostVotedAnecdote = anecdotes[votes.indexOf(highestVotes)];

   
    const getRandomAnecdote = () => {
      const randomIndex = Math.floor(Math.random() * anecdotes.length)
      setSelected(randomIndex)
      
      return (

        <div>
          <p>{anecdotes[randomIndex]}</p>
          <p>has {votes[randomIndex]} votes</p> 
          

        </div>
      )


    }

    











  return (
    <div>
      <h1>give feedback</h1>
      <Button HandleClick={handleGood} text='good' />
      <Button HandleClick={handleNeutral} text='neutral' />
      <Button HandleClick={handleBad} text='bad' />
      {/* <h1>statistics</h1> */}
      {/* <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p> */}


      <Statistics good={good} neutral={neutral} bad={bad} />


        <br />  
        <br />
        <br />


        <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
        <Button HandleClick={getRandomAnecdote} text='next anecdote' />
        <Button HandleClick={handleVote} text='vote' />


        <h1>Anecdote with most votes</h1>
      {highestVotes > 0 ? (
        <div>
          <p>{mostVotedAnecdote}</p>
          <p>has {highestVotes} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}



    </div>
  )












}

export default App