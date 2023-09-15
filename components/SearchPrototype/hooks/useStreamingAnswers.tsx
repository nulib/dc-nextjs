import { Answer, Question, StreamingMessage } from "../types/search-prototype";

const updateStreamAnswers = (
  data: StreamingMessage,
  updatedStreamAnswers: Answer[]
) => {
  // Check if the answer with the given 'ref' already exists in the state
  const answerIndex = updatedStreamAnswers.findIndex(
    (answer) => answer.ref === data.ref
  );
  const existingAnswer = updatedStreamAnswers[answerIndex];

  let updatedAnswer: Answer;
  if (existingAnswer) {
    // Create a shallow copy of the existing answer to modify
    updatedAnswer = { ...existingAnswer };
  } else {
    // Initialize a new answer
    updatedAnswer = {
      answer: "",
      isComplete: false,
      question: data.question,
      ref: data.ref,
      source_documents: [],
    };
  }

  // Update the properties of the answer based on the incoming data
  if (data.token) {
    updatedAnswer.answer += data.token;
  }
  if (data.source_documents) {
    updatedAnswer.source_documents = data.source_documents;
  }
  if (data.answer) {
    updatedAnswer.answer = data.answer;
    updatedAnswer.isComplete = true;
  }

  // Replace or append the answer in the state array
  if (existingAnswer) {
    updatedStreamAnswers[answerIndex] = updatedAnswer;
  } else {
    /**
     * save the question in local storage
     */

    // questions.unshift({ id: ref, question: questionString, timestamp });
    // saveQuestions(questions);

    // Update the state with the modified array
    updatedStreamAnswers.push(updatedAnswer);
  }

  return updatedStreamAnswers;
};

const prepareQuestion = (questionString: string, authToken: string) => {
  const date = new Date();
  const timestamp = date.getTime();

  /**
   * hackily generate unique id from string and timestamp
   */
  const uniqueString = `${questionString}${timestamp}`;

  // Refactor the following as a SHA1[0..4]
  const ref = uniqueString
    .split("")
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
    .toString();

  const question: Question = {
    auth: authToken,
    message: "chat",
    question: questionString,
    ref,
  };

  return question;
};

const useStreamingAnswers = () => {
  return { prepareQuestion, updateStreamAnswers };
};

export default useStreamingAnswers;
