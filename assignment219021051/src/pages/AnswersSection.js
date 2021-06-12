import React, {useRef, useEffect, useState} from 'react'
import {firestore} from "../services/firebase"

import firebase from 'firebase/app';
import 'firebase/auth';
import '../css/hints.css'


function AnswersSection(){

    const [answerone, setAnswerOne] = useState("")
    const [answertwo, setAnswerTwo] = useState("")
    const [answerthree, setAnswerThree] = useState("")
    const [answerfour, setAnswerFour] = useState("")

    const [hintone, setHintOne] = useState("")
    const [hinttwo, setHintTwo] = useState("")
    const [hintthree, setHintThree] = useState("")
    const [hintfour, setHintFour] = useState("")

    const [selectedanswer, setSelectedAnswer] = useState("")

    const [btnclass, setBtnClass] = useState("btn btn-secondary mb-2 p-2")
    const [btnclasstwo, setBtnClassTwo] = useState("btn btn-secondary mb-2 p-2")
    const [btnclassthree, setBtnClassThree] = useState("btn btn-secondary mb-2 p-2")
    const [btnclassfour, setBtnClassFour] = useState("btn btn-secondary mb-2 p-2")


    const [one, setOne] = useState(true)
    const [two, setTwo] = useState(true)
    const [three, setThree] = useState(true)
    const [four, setFour] = useState(true)


    function swapOne(){
        if(one){
            setBtnClass("btn btn-primary mb-2 p-2")
            setBtnClassTwo("btn btn-secondary mb-2 p-2")
            setBtnClassThree("btn btn-secondary mb-2 p-2")
            setBtnClassFour("btn btn-secondary mb-2 p-2")

            setOne(false)
            setTwo(true)
            setThree(true)
            setFour(true)

        }else{
            setBtnClass("btn btn-secondary mb-2 p-2")
            setOne(true)

        }
    }

    
    function swapTwo(){

        if(two){
            setBtnClassTwo("btn btn-primary mb-2 p-2")
            setBtnClass("btn btn-secondary mb-2 p-2")
            setBtnClassThree("btn btn-secondary mb-2 p-2")
            setBtnClassFour("btn btn-secondary mb-2 p-2")
            setOne(true)
            setTwo(false)
            setThree(true)
            setFour(true)

        }else{
            setBtnClassTwo("btn btn-secondary mb-2 p-2")
            setTwo(true)

        }
    }

    
    function swapThree(){

        if(three){
            setBtnClassThree("btn btn-primary mb-2 p-2")
            setBtnClass("btn btn-secondary mb-2 p-2")
            setBtnClassTwo("btn btn-secondary mb-2 p-2")
            setBtnClassFour("btn btn-secondary mb-2 p-2")
            setOne(true)
            setTwo(true)
            setThree(false)
            setFour(true)

        }else{
            setBtnClassThree("btn btn-secondary mb-2 p-2")
            setThree(true)
        }
    }

    
    function swapFour(){

        if(four){
            setBtnClassFour("btn btn-primary mb-2 p-2")
            setBtnClass("btn btn-secondary mb-2 p-2")
            setBtnClassTwo("btn btn-secondary mb-2 p-2")
            setBtnClassThree("btn btn-secondary mb-2 p-2")
            setOne(true)
            setTwo(true)
            setThree(true)
            setFour(false)

        }else{
            setBtnClassFour("btn btn-secondary mb-2 p-2")
            setFour(true)
        }
    }


    const questionId = "balances"

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () =>{

        const doc = firestore.collection('Questions').doc(questionId);
        const observer = doc.onSnapshot(docSnapshot => {

            const data = JSON.parse(JSON.stringify(docSnapshot.data()))
            setAnswerOne(data.balances.balances.questions.answers.one.title)
            setAnswerTwo(data.balances.balances.questions.answers.two.title)
            setAnswerThree(data.balances.balances.questions.answers.three.title)
            setAnswerFour(data.balances.balances.questions.answers.four.title)

        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () =>{

        const doc = firestore.collection('Hints').doc('balances');
        const observer = doc.onSnapshot(docSnapshot => {

            const data = JSON.parse(JSON.stringify(docSnapshot.data()))
            setHintOne(data.percentages.one)
            setHintTwo(data.percentages.two)
            setHintThree(data.percentages.three)
            setHintFour(data.percentages.four)

        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    })

    function checkMyAnswer(answer){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
      
              firestore.collection("Hints")
              .get()
              .then(querySnapshot => {
                const data = querySnapshot.docs.map(
                  doc =>{
                    const data = JSON.parse(JSON.stringify(doc.data()))
                    if(data.correct === answer){
                        alert('Hurray! Correct.')
                    }else{
                        alert('No! that was wrong.')
                    }

                  }
                )}
            )}
        })
    }
        


    function calculatePercentage(answerno){

        var a1p = 0;
        var a2p = 0;
        var a3p = 0;
        var a4p = 0;

        var percentage = 0;
        var percentagetwo = 0;
        var percentagethree = 0;
        var percentagefour = 0;

        var answervalue = 0;
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
      
              firestore.collection("Hints")
              .get()
              .then(querySnapshot => {
                const data = querySnapshot.docs.map(
                  doc =>{
                    const data = JSON.parse(JSON.stringify(doc.data()))
                    var total = Number(data.total)
                    switch (answerno) {
                        case 'one':
                            a1p = Number(data.answers.one)
                            answervalue = a1p + 1
                            total++
                            percentage = Number((a1p * 100) / total)

                            percentagetwo = Number((Number(data.answers.two) * 100) / total)
                            percentagethree = Number((Number(data.answers.three) * 100) / total)
                            percentagefour = Number((Number(data.answers.four) * 100) / total)


                            break;
                        case 'two':
                            a2p = Number(data.answers.two)
                            answervalue = a2p + 1
                            total++
                            percentagetwo = Number((a2p * 100) / total)

                            percentage = Number((Number(data.answers.one) * 100) / total)
                            percentagethree = Number((Number(data.answers.three) * 100) / total)
                            percentagefour = Number((Number(data.answers.four) * 100) / total)

                            break;
                        case 'three':
                            a3p = Number(data.answers.three)
                            answervalue = a3p + 1
                            total++
                            percentagethree = Number((a3p * 100) / total)

                            percentage = Number((Number(data.answers.one) * 100) / total)
                            percentagetwo = Number((Number(data.answers.two) * 100) / total)
                            percentagefour = Number((Number(data.answers.four) * 100) / total)
                            
                            break;
                        case 'four':
                            a4p = Number(data.answers.four)
                            answervalue = a4p + 1
                            total++
                            percentagefour = Number((a4p * 100) / total)

                            percentage = Number((Number(data.answers.one) * 100) / total)
                            percentagetwo = Number((Number(data.answers.two) * 100) / total)
                            percentagethree = Number((Number(data.answers.three) * 100) / total)
                            break;
                    
                        default:
                            break;
                    }
                    savePercentage(answerno, answervalue, percentage, percentagetwo, percentagethree, percentagefour, total)
                    
                  });
    

      
              }).catch(err => {
                
              });
    
            }
          });
    
    
      }
      

      function savePercentage(answerno, answervalue, percentage, percentagetwo, percentagethree, percentagefour, total){

        switch (answerno) {
            case 'one':
                firestore.collection('Hints').doc('balances')
                .set({
                    'answers': {'one' : answervalue},
                    'percentages': {'one' : percentage, 'two' : percentagetwo, 'three' : percentagethree, 'four' : percentagefour},
                    'total': total
                }, {merge: true})
                break;
            case 'two':
                firestore.collection('Hints').doc('balances')
                .set({
                    'answers': {'two' : answervalue},
                    'percentages': {'one' : percentage, 'two' : percentagetwo, 'three' : percentagethree, 'four' : percentagefour},
                    'total': total
                }, {merge: true})
                break;
            case 'three':
                firestore.collection('Hints').doc('balances')
                .set({
                    'answers': {'three' : answervalue},
                    'percentages': {'one' : percentage, 'two' : percentagetwo, 'three' : percentagethree, 'four' : percentagefour},
                    'total': total
                }, {merge: true})
                break;
            case 'four':
                firestore.collection('Hints').doc('balances')
                .set({
                    'answers': {'four' : answervalue},
                    'percentages': {'one' : percentage, 'two' : percentagetwo, 'three' : percentagethree, 'four' : percentagefour},
                    'total': total
                }, {merge: true})
                break;
        
            default:
                break;
            }

      }
    

        
    return (

        <div className="col-12">
        <h3 className="text-center">Answers</h3>
        <div className="p-3 mb-2 bg-light">
            <div className="row">
                <div className="col-sm d-grid gap-2"> 
                    <button type="button" className={btnclass} onClick={()=>{calculatePercentage('one'); setSelectedAnswer('1'); swapOne()}}>{answerone} <b>%({Math.round(hintone)})</b></button>
                    <button type="button" className={btnclasstwo} onClick={()=>{calculatePercentage('two'); setSelectedAnswer('2'); swapTwo()}}>{answertwo} <b>%({Math.round(hinttwo)})</b></button>
                </div>
                <div className="col-sm d-grid gap-2"> 
                    <button type="button" className={btnclassthree} onClick={()=>{calculatePercentage('three'); setSelectedAnswer('3'); swapThree()}}>{answerthree} <b>%({Math.round(hintthree)})</b></button>
                    <button type="button" className={btnclassfour} onClick={()=>{calculatePercentage('four'); setSelectedAnswer('4'); swapFour()}}>{answerfour} <b>%({Math.round(hintfour)})</b></button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm text-center"> 
                    <button type="button" className="btn btn-primary p-4" onClick={()=>{checkMyAnswer(selectedanswer)}}>CHECK MY ANSWER</button>
                </div>
            </div>
        </div>
    </div>

    );
}

export default AnswersSection;