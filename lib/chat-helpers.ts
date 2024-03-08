import { Question } from "../types/components/chat";

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

export { prepareQuestion };
