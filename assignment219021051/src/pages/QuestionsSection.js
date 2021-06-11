import React, {useEffect, useState} from 'react'
import {firestore} from "../services/firebase"


function QuestionsSection(){

    const [title, setTitle] = useState("")
    const [questionText, setQuestionText] = useState("")
    const [imageUri, setImageUri] = useState("")
    const questionId = "balances"

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () =>{

        const doc = firestore.collection('Questions').doc(questionId);
        const observer = doc.onSnapshot(docSnapshot => {

            const data = JSON.parse(JSON.stringify(docSnapshot.data()))

            setTitle(data.balances.balances.questions.title)
            setQuestionText(data.balances.balances.questions.fullquestion.question)
            setImageUri(data.balances.balances.questions.fullquestion.questionimage)
        }, err => {
          console.log(`Encountered error: ${err}`);
        });

    })


    return (

        <div className="col-sm"> 
        <h3 className="text-center">{title}</h3> 
        <div className="p-3 mb-2 bg-light">
            <div className="text-center">
                <img className="mb-4 rounded img-fluid" alt="balance" src={imageUri} />
            </div>
            <p>{questionText}</p> 
        </div> 
    </div>

    );
}

export default QuestionsSection;