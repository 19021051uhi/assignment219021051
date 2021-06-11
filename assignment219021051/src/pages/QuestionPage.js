import QuestionsSection from './QuestionsSection'
import HintsSection from './HintsSection'
import AnswersSection from './AnswersSection'


function QuestionPage(){

    return (

        <div className="container">
            <h1 className="text-center">Question Page</h1> 
            <div className="row"> 
                <QuestionsSection/>
                <HintsSection/>
            </div>                  
            <div className="row"> 
                <AnswersSection/>
            </div>
        </div>


    );
}

export default QuestionPage;