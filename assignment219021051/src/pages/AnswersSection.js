import React, {useEffect, useState} from 'react'
import {firestore} from "../services/firebase"

function AnswersSection(){

    const [answerone, setAnswerOne] = useState("")
    const [answertwo, setAnswerTwo] = useState("")
    const [answerthree, setAnswerThree] = useState("")
    const [answerfour, setAnswerFour] = useState("")

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

            // console.log("========> " + data.balances.balances.questions.answers.one.title)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    })

        
    return (

        <div className="col-12">
        <h3 className="text-center">Answers</h3>
        <div className="p-3 mb-2 bg-light">
            <div className="row">
                <div className="col-sm d-grid gap-2"> 
                    <button type="button" className="btn btn-secondary mb-2 p-2">{answerone}</button>
                    <button type="button" className="btn btn-secondary mb-2 p-2">{answertwo}</button>
                </div>
                <div className="col-sm d-grid gap-2"> 
                    <button type="button" className="btn btn-secondary mb-2 p-2">{answerthree}</button>
                    <button type="button" className="btn btn-secondary mb-2 p-2">{answerfour}</button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm text-center"> 
                    <button type="button" className="btn btn-primary p-4">CHECK MY ANSWER</button>
                </div>
            </div>
        </div>
    </div>

    );
}

export default AnswersSection;