import { useState, useEffect } from "react";
import bannerIcon from "../../assets/icons/banner.svg";
import { TbPhotoX, TbPhotoCheck } from "react-icons/tb";
// import { IoMdAdd } from "react-icons/io";
// import { TiDelete } from "react-icons/ti";
import "../../page/organizations/styles.css";
import trash from "../../assets/icons/trash.svg";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import { useCreateSurveyMutation } from "../../service/admin/survey.service";
import Modals from "../modals/Modal";

const CreateSurvey = () => {
  const [banner, setBanner] = useState(null);
  const [audience, setAudience] = useState("Public");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question_text: "",
      answer_type: "multiple_choice",
      answer_options: []
    }
  ]);

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String);
        setBanner(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCancelBanner = () => {
    setBanner(null);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleMessageAlertChange = (event) => {
    setMessageAlert(event.target.value);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: "",
        answer_type: "multiple_choice",
        answer_options: []
      }
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

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer_options = newQuestions[
      questionIndex
    ].answer_options.filter((_, i) => i !== optionIndex);
    setQuestions(newQuestions);
  };

  const [createSurvey, { error, isSuccess, isLoading }] =
    useCreateSurveyMutation({
      provideTag: ["Survey"]
    });

  const handleSubmit = async () => {
    const data = {
      banner,
      audience,
      message_alert: messageAlert,
      topic,
      description,
      questions
    };
    await rtkMutation(createSurvey, data);
    setAudience("Public");
    setQuestions([
      {
        question_text: "",
        answer_type: "multiple_choice",
        answer_options: []
      }
    ]);
    setDescription("");
    setTopic("");
    setMessageAlert("");
    setBanner(null);

    // console.log("Form submitted:", { audience, topic, description, questions });
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Survey created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  const handlePreview = () => {
    setIsPreviewOpen(true); // Open the preview modal
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false); // Close the preview modal
  };

  return (
    <>
      <div className="survey-create-img-banner h-[170px] rounded-[10px] w-full bg-[#EBEBEB] flex justify-center items-center">
        {banner ? (
          <div className="relative w-full h-full">
            <img
              src={banner}
              alt="uploaded-banner"
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button
                onClick={handleCancelBanner}
                className="cancel-survey-banner-btn bg-red-500 text-white px-2 py-1 rounded"
              >
                <TbPhotoX size={20} />
              </button>
              <button
                onClick={() => document.getElementById("bannerInput").click()}
                className="change-survey-banner-btn bg-blue-500 text-white px-2 py-1 rounded"
              >
                <TbPhotoCheck size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 flex-col">
            <img src={bannerIcon} alt="banner-icon" />
            <button
              onClick={() => document.getElementById("bannerInput").click()}
              className="upload-survey-banner-btn w-auto"
            >
              Upload Banner
            </button>
          </div>
        )}
        <input
          type="file"
          id="bannerInput"
          accept="image/*"
          onChange={handleBannerChange}
          className="hidden"
        />
      </div>

      <div className="survey-create-questions mt-4 border shadow bg-transparent rounded-[8px] p-5 md:p-8">
        <div className="flex flex-col w-full gap-3 mb-5">
          <label className="survey-form-label">Survey Topic</label>
          <input
            type="text"
            className="survey-form-input focus:outline-none focus:ring-0"
            placeholder="What is the title of your survey?"
            value={topic}
            onChange={handleTopicChange}
          />
        </div>

        <div className="flex flex-col w-full gap-3 mb-5">
          <label className="survey-form-label">Description of Survey</label>
          <input
            type="text"
            className="survey-form-input focus:outline-none focus:ring-0"
            placeholder="Describe what your survey is about"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="flex flex-col w-full gap-3 mb-5">
          <label className="survey-form-label">Message alert</label>
          <input
            type="text"
            className="survey-form-input focus:outline-none focus:ring-0"
            placeholder="e.g Thank you for filling our survey. We appreciate your feedback 😍"
            onChange={handleMessageAlertChange}
            value={messageAlert}
          />
        </div>
      </div>

      <div className="survey-create-questions mt-4 border shadow bg-transparent rounded-[8px] p-5 md:p-8">
        {questions.map((question, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col w-full gap-3">
                <label
                  className="survey-form-label"
                  htmlFor={`question_${index}`}
                >
                  Ask a Question:
                </label>
                <input
                  type="text"
                  name={`question_${index}`}
                  value={question.question_text}
                  onChange={(e) =>
                    handleQuestionTextChange(index, e.target.value)
                  }
                  className="w-full focus:ring-0 focus:outline-none survey-form-input"
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  {/* <TiDelete size={25} /> */}
                  <img src={trash} alt="" />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center w-full pt-5">
              <label
                className="survey-question-type"
                htmlFor={`answerType_${index}`}
              >
                Question type:
              </label>
              <select
                id={`answerType_${index}`}
                value={question.answer_type}
                onChange={(e) => handleAnswerTypeChange(index, e.target.value)}
                className="focus:outline-none focus:ring-0 border-0 bg-transparent survey-questontype-box"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="single_choice">Single Choice</option>
                <option value="text">Text</option>
                <option value="true_or_false">True/False</option>
                <option value="time">Time</option>
                <option value="date">Date</option>
              </select>
            </div>

            {(question.answer_type === "multiple_choice" ||
              question.answer_type === "single_choice") && (
              <div className="pt-3">
                {question.answer_options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex gap-2 items-center mb-2 w-full"
                  >
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].answer_options[optionIndex] =
                          e.target.value;
                        setQuestions(newQuestions);
                      }}
                      className="rounded-md focus:ring-0 focus:outline-none w-full"
                    />
                    <button
                      onClick={() => handleDeleteOption(index, optionIndex)}
                      className="text-red-500"
                    >
                      {/* <TiDelete size={25} /> */}
                      <img src={trash} alt="" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newQuestions = [...questions];
                    newQuestions[index].answer_options.push("");
                    setQuestions(newQuestions);
                  }}
                  className="survey-add-option p-1 rounded-md flex items-center gap-1 mt-3"
                >
                  {/* <IoMdAdd size={20} /> */}
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="survey-box flex justify-end pt-5">
          <button onClick={addQuestion} className="p-2 survey-add-new-question">
            {/* <IoMdAdd size={20} /> */}
            Add new Question{" "}
          </button>
        </div>
      </div>

      <div className="mt-5 justify-between items-center flex gap-5">
        {/* <button
          className="w-[181px] h-[46.9px] rounded-[6.98px] p-2 bg-[#fff] text-black border"
          onClick={handlePreview}
          disabled={
            !topic.trim() ||
            !description.trim() ||
            !Array.isArray(questions) ||
            questions.length === 0
          }
        >
          Preview
        </button> */}

        <button
          className="w-[181px] h-[46.9px] rounded-[6.98px] p-2 bg-[#3D7100] text-white"
          onClick={handleSubmit}
          disabled={
            !topic.trim() ||
            !description.trim() ||
            !Array.isArray(questions) ||
            questions.length === 0
          }
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
            "Create Survey"
          )}
        </button>
      </div>

      {/* Survey Preview Modal */}
      {isPreviewOpen && (
        <Modals
          title="Survey Preview"
          openModal={isPreviewOpen}
          modalSize="2xl"
          onClose={handleClosePreview}
        >
          <div className="modal-content p-6 bg-white rounded-lg shadow-lg space-y-6">
            {banner && (
              <div className="mb-6">
                <img
                  src={banner}
                  alt="Preview Banner"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">{topic}</h3>
              <p className="text-lg text-gray-600">{description}</p>
              {messageAlert && (
                <p className="text-md text-gray-500 italic">"{messageAlert}"</p>
              )}
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <h4 className="text-xl font-medium text-gray-700">
                    Q{index + 1}: {question.question_text}
                  </h4>
                  <p className="text-md text-gray-500 mt-1">
                    Answer Type:{" "}
                    <span className="font-semibold">
                      {question.answer_type.replace("_", " ")}
                    </span>
                  </p>
                  {question.answer_type === "multiple_choice" ||
                  question.answer_type === "single_choice" ? (
                    <ul className="list-disc pl-5 mt-2 text-gray-600">
                      {question.answer_options.length > 0 ? (
                        question.answer_options.map((option, optionIndex) => (
                          <li key={optionIndex}>{option}</li>
                        ))
                      ) : (
                        <p className="text-sm text-red-500">
                          No options provided
                        </p>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      This question expects a{" "}
                      {question.answer_type.replace("_", " ")} answer.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleClosePreview}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Close Preview
            </button>
          </div>
        </Modals>
      )}
    </>
  );
};

export default CreateSurvey;
