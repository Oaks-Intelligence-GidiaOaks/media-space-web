import { useLocation } from "react-router-dom";
import { useGetResponseQuery } from "../../service/admin/survey.service";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";
import { useState } from "react";

function SurveyResponses() {
  const location = useLocation();
  const { id } = location.state;

  const { data: surveyResponse, isLoading, refetch } = useGetResponseQuery(id);
  const survey = surveyResponse?.data;
  console.log(survey);

  // Function to render answer based on answer type
  function renderAnswer(answer) {
    switch (answer.answer_type) {
      case "multiple_choice":
        return answer.selected_options.join(", ");
      case "single_choice":
        return answer.selected_options;
      case "text":
        return answer.text;
      case "true_or_false":
        return answer.true_or_false ? "Yes" : "No";
      case "time":
        return answer.time;
      case "date":
        return new Date(answer.date).toLocaleDateString();
      default:
        return null;
    }
  }

  // Function to group responses by respondent
  function groupResponsesByRespondent(responses) {
    const groupedResponses = {};
    responses.forEach((response) => {
      const respondentId = response.respondent._id;
      if (!groupedResponses[respondentId]) {
        groupedResponses[respondentId] = [];
      }
      groupedResponses[respondentId].push(response);
    });
    return groupedResponses;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const responsesPerPage = 5;

  // Logic for pagination
  const indexOfLastResponse = currentPage * responsesPerPage;
  const indexOfFirstResponse = indexOfLastResponse - responsesPerPage;
  const currentResponses = survey?.responses.slice(
    indexOfFirstResponse,
    indexOfLastResponse
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="py-3">
        <Breadcrumb aria-label="Default breadcrumb example" className="px-3">
          <Breadcrumb.Item>
            <Link to="/dashboard/overview">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/dashboard/survey">Surveys</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Survey Responses</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="survey-details pt-5 px-3">
        {isLoading || !survey ? (
          <div>Loading Responses...</div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Topic: {survey.topic}</h2>
            <p className="text-lg font-bold mb-4">
              Description: {survey.description}
            </p>
            <h3 className="text-lg font-semibold">Questions:</h3>
            <ul className="list-disc ml-6 mb-4">
              {survey.questions.map((question) => (
                <li key={question._id}>{question.question_text}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold">Responses:</h3>
            <Accordion className="mt-4">
              {Object.entries(groupResponsesByRespondent(survey.responses)).map(
                ([respondentId, responses]) => (
                  <AccordionPanel key={respondentId}>
                    <AccordionTitle>
                      {responses.map((response) => (
                        <div key={response._id} className="flex gap-5">
                          <p>Name: {response.respondent.display_name}</p>
                          <p>Email: {response.respondent.email}</p>
                        </div>
                      ))}
                    </AccordionTitle>

                    <AccordionContent>
                      <div className="ml-6">
                        <ul className="list-disc ml-4">
                          {responses.map((response) => (
                            <li key={response._id}>
                              {response.answers.map((answer) => (
                                <div key={answer._id} className="mb-2">
                                  <strong className="text-blue-500">
                                    {answer.question.question_text}
                                  </strong>
                                  <div className="ml-4">
                                    {renderAnswer(answer)}
                                  </div>
                                </div>
                              ))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionPanel>
                )
              )}
            </Accordion>
            {/* Pagination */}
            {survey.responses.length > responsesPerPage && (
              <nav className="mt-4">
                <ul className="flex justify-center">
                  {Array.from(
                    {
                      length: Math.ceil(
                        survey.responses.length / responsesPerPage
                      ),
                    },
                    (_, i) => (
                      <li key={i} className="mx-1">
                        <button
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SurveyResponses;
