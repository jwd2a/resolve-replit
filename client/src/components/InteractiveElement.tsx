import { FC, useState } from "react";

interface Question {
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface InteractiveElementProps {
  title: string;
  description: string;
  questions: Question[];
}

const InteractiveElement: FC<InteractiveElementProps> = ({
  title,
  description,
  questions
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };
  
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="bg-dark-400 border border-gray-700 rounded-lg mb-6">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-medium">{currentQuestion.title}</h3>
          <div className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="mb-2">{currentQuestion.question}</p>
          </div>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input 
                  type="radio" 
                  id={`option${index}`} 
                  name={`question${currentQuestionIndex}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-dark-300"
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  disabled={isSubmitted}
                />
                <label 
                  htmlFor={`option${index}`} 
                  className={`ml-2 block text-sm ${
                    isSubmitted && index === currentQuestion.correctAnswer
                      ? "text-green-400"
                      : isSubmitted && index === selectedOption && !isCorrect
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            {isSubmitted ? (
              <div className="flex items-center gap-4">
                <div className={isCorrect ? "text-green-400" : "text-red-400"}>
                  {isCorrect 
                    ? "Correct! Well done." 
                    : "Incorrect. The correct answer is highlighted."}
                </div>
                {currentQuestionIndex < questions.length - 1 && (
                  <button 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm"
                  >
                    Next Question
                  </button>
                )}
              </div>
            ) : (
              <button 
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm"
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveElement;
