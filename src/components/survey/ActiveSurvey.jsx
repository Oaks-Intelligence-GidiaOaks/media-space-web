import { useState, useEffect } from "react";
import {
  useActiveSurveyQuery,
  useDeleteSurveyMutation,
  useEndSurveyMutation,
  useUpdateSurveyMutation
} from "../../service/admin/survey.service";
import Card from "./Card";
import { showAlert } from "../../static/alert";
import { Spinner } from "flowbite-react";
import Modals from "../modals/Modal";
import trash from "../../assets/icons/trash.svg";
import { TbPhotoX, TbPhotoCheck } from "react-icons/tb";

const ActiveSurvey = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [banner, setBanner] = useState(null);
  const [audience, setAudience] = useState("Public");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [questions, setQuestions] = useState([]);
  const [surveyId, setSurveyId] = useState(null);

  const {
    data: activeSurvey,
    refetch,
    isFetching: activeSurveyFetching
  } = useActiveSurveyQuery({
    page: currentPage,
    page_size: itemsPerPage
  });

  const [deleteSurvey, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteSurveyMutation();

  const handleDeleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        await deleteSurvey(id);
        console.log("Survey deleted successfully");
      } catch (error) {
        console.error("Error deleting survey:", error);
      }
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      showAlert("", "Survey deleted Successfully!", "success");
      refetch();
    } else if (deleteError) {
      showAlert(
        "Oops",
        deleteError.data?.message || "An error occurred",
        "error"
      );
    }
  }, [deleteSuccess, deleteError, refetch]);

  const [endSurvey, { isSuccess: endSurveySuccess, error: endSurveyError }] =
    useEndSurveyMutation();

  const handleEndSurvey = async (id) => {
    if (window.confirm("Are you sure you want to end this survey?")) {
      try {
        await endSurvey(id);
        console.log("Survey ended successfully");
      } catch (error) {
        console.error("Error ending survey:", error);
      }
    }
  };

  useEffect(() => {
    if (endSurveySuccess) {
      showAlert("", "Survey ended Successfully!", "success");
      refetch();
    } else if (endSurveyError) {
      showAlert(
        "Oops",
        endSurveyError.data?.message || "An error occurred",
        "error"
      );
    }
  }, [endSurveySuccess, endSurveyError, refetch]);

  useEffect(() => {
    if (activeSurvey?.data?.total_items) {
      setTotalPages(Math.ceil(activeSurvey.data.total_items / itemsPerPage));
    }
  }, [activeSurvey]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      refetch();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      refetch();
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handleEditSurvey = (row) => {
    setBanner(row.banner_url || null);
    setAudience(row.audience || "Public");
    setTopic(row.topic || "");
    setDescription(row.description || "");
    setMessageAlert(row.message_alert || "");
    setQuestions(row.questions || []);
    setSurveyId(row._id);
    setOpenModal(true);
  };

  const [
    updateSurvey,
    { isSuccess: updateSuccess, error: updateError, isLoading }
  ] = useUpdateSurveyMutation();

  const handleSubmit = async () => {
    const data = {
      surveyId,
      banner,
      audience,
      topic,
      description,
      message_alert: messageAlert,
      questions
    };

    console.log(data);

    try {
      await updateSurvey(data);
      showAlert("", "Survey updated Successfully!", "success");
      setOpenModal(false);
      refetch();
    } catch (error) {
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      showAlert("", "Survey updated Successfully!", "success");
    } else if (updateError) {
      showAlert(
        "Oops",
        updateError.data?.message || "An error occurred",
        "error"
      );
    }
  }, [updateSuccess, updateError]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: "",
        answer_type: "multiple_choice",
        answer_options: []
      }
    ]);
    console.log(questions);
  };

  const handleAnswerTypeChange = (index, newType) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = { ...newQuestions[index], answer_type: newType };
      return newQuestions;
    });
  };

  const handleQuestionTextChange = (index, newText) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (qIndex === index) {
        return { ...question, question_text: newText };
      }
      return question;
    });
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

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer_options = [
      ...newQuestions[questionIndex].answer_options,
      ""
    ];
    setQuestions(newQuestions);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {activeSurveyFetching ? (
          <div className="flex justify-center items-center pt-5">
            <Spinner />
          </div>
        ) : activeSurvey?.data.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 pt-10 w-full">
            <p className="empty-survey-text">
              You have not created a survey yet
            </p>
            <p className="empty-survey-desc text-center">
              Create new survey to collect valuable insights, understand
              <br className="hidden md:flex" />
              opinions, and make informed decisions from your followers.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 w-full items-center">
            {[...(activeSurvey?.data?.data || [])]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((row, idx) => (
                <Card
                  id={row?._id}
                  key={idx}
                  topic={row?.topic}
                  desc={row?.description}
                  created={row?.createdAt}
                  count={row?.response_count}
                  deleteSurvey={handleDeleteSurvey}
                  endSurvey={handleEndSurvey}
                  editSurvey={() => handleEditSurvey(row)}
                />
              ))}
          </div>
        )}

        {activeSurvey?.data && (
          <div className="mt-5 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-[8px] survey-pagination-btn w-[114px]"
            >
              &larr; Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-[8px] ${
                    currentPage === index + 1
                      ? "bg-gray-200 text-gray-900"
                      : "bg-white text-gray-500"
                  }`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="px-4 py-2 border rounded-[8px] survey-pagination-btn w-[88px]"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {openModal && (
          <Modals
            title="Edit Survey"
            openModal={openModal}
            modalSize="2xl"
            onClose={() => setOpenModal(false)}
          >
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
                      onClick={() => setBanner(null)}
                      className="cancel-survey-banner-btn flex items-center text-lg gap-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      <TbPhotoX size={20} />
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        document.getElementById("bannerInput").click()
                      }
                      className="upload-survey-banner-btn flex items-center text-lg gap-2 bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      <TbPhotoCheck size={20} />
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-gray-500">Upload Banner</p>
                  <button
                    onClick={() =>
                      document.getElementById("bannerInput").click()
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Upload
                  </button>
                </div>
              )}
              <input
                id="bannerInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setBanner(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div className="flex flex-col w-full gap-3 mb-5 mt-5">
              <label className="survey-form-label">Survey Topic</label>
              <input
                type="text"
                className="survey-form-input focus:outline-none focus:ring-0"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-3 mb-5">
              <label className="survey-form-label">Description of Survey</label>
              <input
                className="survey-form-input focus:outline-none focus:ring-0"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-3 mb-5">
              <label className="survey-form-label">Message Alert</label>
              <input
                className="survey-form-input focus:outline-none focus:ring-0"
                value={messageAlert}
                onChange={(e) => setMessageAlert(e.target.value)}
              />
            </div>

            <div className="">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="mt-2 mb-5 survey-create-questions border shadow bg-transparent rounded-[8px] p-5 md:p-8"
                >
                  <div className="flex flex-col w-full mb-3">
                    <label className="survey-form-label">Question</label>

                    <input
                      type="text"
                      className="survey-form-input focus:outline-none focus:ring-0 block w-full mt-2"
                      value={question.question_text}
                      onChange={(e) =>
                        handleQuestionTextChange(index, e.target.value)
                      }
                      placeholder="Enter question"
                    />
                  </div>

                  <div className="flex flex-col items-center w-full mb-3">
                    <label
                      className="survey-question-type w-full"
                      htmlFor={`answerType_${index}`}
                    >
                      Question type:
                    </label>

                    <select
                      className="survey-form-input focus:outline-none focus:ring-0 mt-2 block w-full"
                      value={question.answer_type}
                      onChange={(e) =>
                        handleAnswerTypeChange(index, e.target.value)
                      }
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
                    <>
                      <label className="survey-question-type w-full">
                        Options:
                      </label>
                      {question.answer_options.map((option, optIndex) => (
                        <>
                          <div
                            key={optIndex}
                            className="flex items-center mt-2"
                          >
                            <input
                              type="text"
                              className="survey-form-input focus:outline-none focus:ring-0 w-full"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.answer_options];
                                newOptions[optIndex] = e.target.value;
                                setQuestions((prevQuestions) => {
                                  const newQuestions = [...prevQuestions];
                                  newQuestions[index] = {
                                    ...newQuestions[index],
                                    answer_options: newOptions
                                  };
                                  return newQuestions;
                                });
                              }}
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            <button
                              type="button"
                              className="ml-2 text-red-600"
                              onClick={() =>
                                handleDeleteOption(index, optIndex)
                              }
                            >
                              <img src={trash} alt="" />
                            </button>
                          </div>
                        </>
                      ))}
                      <button
                        type="button"
                        className="mt-2 survey-add-option"
                        onClick={() => handleAddOption(index)}
                      >
                        Add Option
                      </button>
                      <br />
                    </>
                  )}
                  <button
                    type="button"
                    className="mt-2 text-red-600"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete this Question
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 survey-add-new-question"
                onClick={addQuestion}
              >
                Add Question
              </button>
            </div>

            <div className="flex justify-end py-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#3D7100] text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Saving.." : "        Save Changes"}
              </button>
            </div>
          </Modals>
        )}
      </div>
    </>
  );
};

export default ActiveSurvey;
