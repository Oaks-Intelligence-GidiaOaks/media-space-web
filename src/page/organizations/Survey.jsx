import { useState, useEffect } from "react";
import { BiGlobe, BiLock, BiGroup } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import {
  useCreateSurveyMutation,
  useGetAllSurveyQuery,
  useActiveSurveyQuery,
  useEndSurveyMutation,
  useSurveyHistoryQuery,
  useDeleteSurveyMutation,
  // useSurveyResponsesQuery,
} from "../../service/admin/survey.service";
import { showAlert } from "../../static/alert";
import rtkMutation from "../../utils/rtkMutation";
import { Table, Badge, Tabs } from "flowbite-react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { CgTrash } from "react-icons/cg";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Survey() {
  const [audience, setAudience] = useState("Public");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const {
    data: surveyData,
    isLoading: surveyLoading,
    refetch,
  } = useGetAllSurveyQuery();

  const surveyRows = surveyData?.data;
  const {
    data: activeSurvey,
    isLoading: activeSurveyloading,
    refetch: activeSurveyRefetch,
  } = useActiveSurveyQuery();
  const { data: surveryHistory, isLoading: surveyHistoryLoading } =
    useSurveyHistoryQuery();

  const [endSurvey, { isSuccess: endSurveySuccess, error: endSurveyError }] =
    useEndSurveyMutation();

  const handleEndSurvey = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to end this survey?"
    );
    if (!confirmDelete) return;

    try {
      await endSurvey(id);
      console.log("Survey ended successfully");
    } catch (error) {
      console.error("Error ending survey:", error);
    }
  };

  const navigate = useNavigate();
  const showSurveyResponse = (id) => {
    navigate(`/dashboard/survey/survey-response/${id}`, { state: { id } });
  };

  useEffect(() => {
    if (endSurveySuccess) {
      showAlert("", "Survey ended Successfully!", "success");
      refetch();
      activeSurveyRefetch();
    } else if (endSurveyError) {
      showAlert(
        "Oops",
        endSurveyError.data.message || "An error occurred",
        "error"
      );
    }
  }, [endSurveySuccess, endSurveyError, refetch, activeSurveyRefetch]);

  const [deleteSurvey, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteSurveyMutation();

  const handleDeleteSurvey = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this survey?"
    );
    if (!confirmDelete) return;

    try {
      await deleteSurvey(id);
      console.log("Survey deleted successfully");
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      showAlert("", "Survey deleted Successfully!", "success");
      refetch();
      activeSurveyRefetch();
    } else if (deleteError) {
      showAlert(
        "Oops",
        deleteError.data.message || "An error occurred",
        "error"
      );
    }
  }, [deleteSuccess, deleteError, refetch, activeSurveyRefetch]);

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

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer_options = newQuestions[
      questionIndex
    ].answer_options.filter((_, oIndex) => oIndex !== optionIndex);
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
      refetch();
      activeSurveyRefetch();
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, refetch, activeSurveyRefetch]);

  return (
    <>
      <h1 className="text-[25px] px-3 bold py-5">Survey</h1>

      <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" style="fullWidth">
          <Tabs.Item active title="Create Survey">
            <div className="max-w-[436px] w-full border p-5 rounded-md">
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
                  <label htmlFor="topic">Survey Topic:</label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={handleTopicChange}
                    className="w-full rounded-md focus:ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full rounded-md focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {questions.map((question, index) => (
                <div key={index} className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <label htmlFor={`question_${index}`}>
                        Ask a Question:
                      </label>
                      <input
                        type="text"
                        name={`question_${index}`}
                        value={question.question_text}
                        onChange={(e) =>
                          handleQuestionTextChange(index, e.target.value)
                        }
                        className="w-full rounded-md focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(index)}
                      className="text-red-500"
                    >
                      <TiDelete size={25} />
                    </button>
                  </div>
                  <label htmlFor={`answerType_${index}`}>Answer Type:</label>
                  <select
                    id={`answerType_${index}`}
                    value={question.answer_type}
                    onChange={(e) =>
                      handleAnswerTypeChange(index, e.target.value)
                    }
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
                        <div
                          key={optionIndex}
                          className="flex gap-2 items-center mb-2"
                        >
                          {/* <input
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
                          /> */}
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].answer_options[optionIndex] =
                                e.target.value;
                              setQuestions(newQuestions);
                            }}
                            className="rounded-md focus:ring-0 focus:outline-none"
                          />
                          <button
                            onClick={() =>
                              handleDeleteOption(index, optionIndex)
                            }
                            className="text-red-500"
                          >
                            <TiDelete size={25} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].answer_options.push("");
                          setQuestions(newQuestions);
                        }}
                        className="border p-1 rounded-md flex items-center gap-1 mt-3"
                      >
                        <IoMdAdd size={20} />
                        Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="survey-box flex justify-end pt-5">
                <button
                  onClick={addQuestion}
                  className="text-sm flex gap-3 items-center text-black border rounded-md p-2"
                >
                  <IoMdAdd size={20} />
                  Add Question
                </button>
              </div>

              <div className="survey-box flex justify-center pt-5">
                <button
                  onClick={handleSubmit}
                  className="text-sm w-full text-white bg-[#34B53A] p-2 border rounded-md"
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
          </Tabs.Item>
          <Tabs.Item title="All Survey">
            <div className="w-auto survey-table border rounded-md">
              <div className="p-2">
                {surveyLoading ? (
                  <ShimmerThumbnail width={400} height={400} />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <Table.Head>
                        <Table.HeadCell>Topic</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Audience</Table.HeadCell>
                        <Table.HeadCell>Questions</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {surveyRows &&
                          [...surveyRows]
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            ?.map((data) => (
                              <Table.Row
                                key={data._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                <Table.Cell>{data?.topic}</Table.Cell>
                                <Table.Cell>{data?.description}</Table.Cell>
                                <Table.Cell>{data?.audience}</Table.Cell>
                                <Table.Cell>
                                  {data?.questions?.map((question, index) => (
                                    <span key={index}>
                                      {question.question_text}
                                      {index !== data.questions.length - 1 &&
                                        ", "}
                                    </span>
                                  ))}
                                </Table.Cell>
                                <Table.Cell>
                                  {data?.active === true ? (
                                    <Badge color="info">Active</Badge>
                                  ) : (
                                    <Badge color="gray">Inactive</Badge>
                                  )}
                                </Table.Cell>
                                <Table.Cell className="flex gap-2">
                                  {/* <button
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                title="edit this survey"
                                onClick={() => handleEditSurvey(data)}
                              >
                                <RiFileEditLine size={20} />
                              </button> */}
                                  <button
                                    className="font-medium text-red-500 hover:underline dark:text-cyan-500"
                                    title="delete this survey"
                                    onClick={() =>
                                      handleDeleteSurvey(data?._id)
                                    }
                                  >
                                    <CgTrash size={20} />
                                  </button>
                                  <button
                                    className="font-medium text-blue-500 hover:underline dark:text-cyan-500"
                                    title="end this survey"
                                    onClick={() => handleEndSurvey(data?._id)}
                                  >
                                    <MdOutlineMobileFriendly size={20} />
                                  </button>
                                  <button
                                    className="font-medium text-blue-500 hover:underline dark:text-cyan-500"
                                    title="view responses"
                                    onClick={() =>
                                      showSurveyResponse(data?._id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                    </svg>
                                  </button>
                                </Table.Cell>
                              </Table.Row>
                            ))}
                      </Table.Body>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Active Surveys">
            <div className="w-auto survey-table border rounded-md">
              <div className="p-2">
                {activeSurveyloading ? (
                  <ShimmerThumbnail width={400} height={400} />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <Table.Head>
                        <Table.HeadCell>Topic</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Audience</Table.HeadCell>
                        <Table.HeadCell>Questons</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {activeSurvey?.data?.map((data) => (
                          <Table.Row
                            key={data._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <Table.Cell>{data?.topic}</Table.Cell>
                            <Table.Cell>{data?.description}</Table.Cell>
                            <Table.Cell>{data?.audience}</Table.Cell>
                            <Table.Cell>
                              {data?.questions?.map((question, index) => (
                                <>
                                  <span key={index}>
                                    {question.question_text}
                                    {index !== data.questions.length - 1 &&
                                      ", "}
                                  </span>
                                </>
                              ))}
                            </Table.Cell>
                            <Table.Cell>
                              {data?.active === true ? (
                                <Badge color="info">Active</Badge>
                              ) : (
                                <Badge color="gray">Inactive</Badge>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Survey Histories">
            <div className="w-auto survey-table border rounded-md">
              <div className="p-2">
                {surveyHistoryLoading ? (
                  <ShimmerThumbnail width={400} height={400} />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <Table.Head>
                        <Table.HeadCell>Topic</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Audience</Table.HeadCell>
                        <Table.HeadCell>Questons</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {surveryHistory?.data?.map((data) => (
                          <Table.Row
                            key={data._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <Table.Cell>{data?.topic}</Table.Cell>
                            <Table.Cell>{data?.description}</Table.Cell>
                            <Table.Cell>{data?.audience}</Table.Cell>
                            <Table.Cell>
                              {data?.questions?.map((question, index) => (
                                <>
                                  <span key={index}>
                                    {question.question_text}
                                    {index !== data.questions.length - 1 &&
                                      ", "}
                                  </span>
                                </>
                              ))}
                            </Table.Cell>
                            <Table.Cell>
                              {data?.active === true ? (
                                <Badge color="info">Active</Badge>
                              ) : (
                                <Badge color="gray">Inactive</Badge>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
}

export default Survey;
