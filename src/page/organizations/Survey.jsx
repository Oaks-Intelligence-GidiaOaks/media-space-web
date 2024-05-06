import { useState, useEffect } from "react";
import { BiGlobe, BiLock, BiGroup } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useCreateSurveyMutation } from "../../service/admin/survey.service";
import { showAlert } from "../../static/alert";
import rtkMutation from "../../utils/rtkMutation";

function Survey() {
  const [audience, setAudience] = useState("Public");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: "",
        answer_type: "multiple_choice",
        answer_options: [],
      },
    ]);
  };

  const handleQuestionTextChange = (index, newText) => {
    const newQuestions = [...questions];
    newQuestions[index].question_text = newText;
    setQuestions(newQuestions);
  };

  const handleAnswerTypeChange = (index, newType) => {
    const newQuestions = [...questions];
    newQuestions[index].answer_type = newType;
    setQuestions(newQuestions);
  };

  const [createSurvey, { error, isSuccess, isLoading }] =
    useCreateSurveyMutation({
      provideTag: ["Survey"],
    });

  const handleSubmit = async () => {
    const data = { audience, topic, description, questions };
    await rtkMutation(createSurvey, data);
    setAudience("Public");
    setQuestions([]);
    setDescription("");
    setTopic("");

    // console.log("Form submitted:", { audience, topic, description, questions });
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Survey created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  return (
    <div className="survey-page flex flex-col justify-center">
      <div className="w-[436px] border p-5">
        <div className="flex flex-col justify-start mb-5 gap-5">
          <p className="survey-text">Create Survey</p>
          <div className="flex justify-start items-center gap-5">
            <label htmlFor="audienceSelect">Select Audience:</label>
            <div className="select-image">
              {audience === "Public" ? (
                <BiGlobe size={20} />
              ) : audience === "Private" ? (
                <BiLock size={20} />
              ) : (
                <BiGroup size={20} />
              )}
            </div>
            <select
              value={audience}
              onChange={handleAudienceChange}
              className="focus:outline-none focus:ring-0 border-0 bg-transparent"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Followers">Followers</option>
            </select>
          </div>
          <div>
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={handleTopicChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full"
            />
          </div>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="pb-2">
            <label htmlFor={`question_${index}`}>Question:</label>
            <input
              type="text"
              name={`question_${index}`}
              value={question.question_text}
              onChange={(e) => handleQuestionTextChange(index, e.target.value)}
              className="w-full"
            />
            <label htmlFor={`answerType_${index}`}>Answer Type:</label>
            <select
              id={`answerType_${index}`}
              value={question.answer_type}
              onChange={(e) => handleAnswerTypeChange(index, e.target.value)}
              className="focus:outline-none focus:ring-0 border-0 bg-transparent"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="single_choice">Single Choice</option>
              <option value="text">Text</option>
              <option value="true_or_false">True/False</option>
              <option value="time">Time</option>
              <option value="date">Date</option>
            </select>
            {(question.answer_type === "multiple_choice" ||
              question.answer_type === "single_choice") && (
              <div>
                {question.answer_options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type={
                        question.answer_type === "multiple_choice"
                          ? "checkbox"
                          : "radio"
                      }
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].answer_options[optionIndex] =
                          e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].answer_options[optionIndex] =
                          e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newQuestions = [...questions];
                    newQuestions[index].answer_options.push("");
                    setQuestions(newQuestions);
                  }}
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="survey-box flex justify-end pt-5">
          <button
            onClick={addQuestion}
            className="text-sm flex gap-3 items-center text-white bg-[#34B53A] p-2"
          >
            <IoMdAdd size={20} />
            Add Question
          </button>
        </div>

        <div className="survey-box flex justify-center pt-5">
          <button
            onClick={handleSubmit}
            className="text-sm w-full text-white bg-[#34B53A] p-2"
          >
            {isLoading ? (
              <>
                <span className="loading-dots">
                  <span className="loading-dots-dot"></span>
                  <span className="loading-dots-dot"></span>
                  <span className="loading-dots-dot"></span>
                </span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Survey;
