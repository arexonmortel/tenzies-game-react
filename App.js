import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(()=>{
        const allHeld = dice.every(die=>die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
        }
    },[dice])

   //Helper Function
    function generateNewDice(){
        return { value: Math.ceil(Math.random() * 16), isHeld: false, id: nanoid()
        }
    }
    function allNewDice(){
        const newArray =[]
        for(let i = 0; i < 10; i++){
            newArray.push(generateNewDice())
        }
        return newArray
        
    }
    function rollDice(){
        if(!tenzies) {
        setDice(oldDice => oldDice.map(dice => {
            return dice.isHeld ? dice : generateNewDice()
        }) )
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function toggle(id){
        setDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? {value: dice.value, id: dice.id, isHeld: !dice.isHeld} : dice
        }))
    }
     const diceElements = dice.map(die => <Die key = {die.id} value ={die.value} isHeld = {die.isHeld} toggle = {()=> toggle(die.id)}/>)
     
    
     
     
    return (
        <main>
            {tenzies && <Confetti 
            width= {window.innerWidth}
            height= {window.innerHeight}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            
            <div className="dice-container">
               {diceElements}
            </div>
            <button className = "roll-dice" onClick ={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}