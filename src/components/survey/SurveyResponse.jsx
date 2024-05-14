import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { Table } from "flowbite-react";
import getTimeAgoString from "../../utils/getTimeAgoString";

const SurveyResponse = ({ onclose, id }) => {
  // Add prop validation
  SurveyResponse.propTypes = {
    onclose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  const token = useSelector((state) => state.user?.token);
  const [responses, setResponses] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    resolve();
  }, [id]);

  const resolve = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    if (id) {
      try {
        const response = await axios.get(
          `${apiUrl}/admin/survey/${id}/response`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        console.log(" successfully:", response.data.data.responses);
        setResponses(response.data.data.responses);
        setShowShimmer(false);
        console.log(responses, "responses");
      } catch (error) {
        console.error("Error submitting post:", error);
        showAlert(
          "Oops!",
          error?.response?.data?.message || "An error occurred",
          "error"
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg">
      <div>
        {responses.length <= 0 && showShimmer ? (
          <ShimmerThumbnail width={400} height={400} />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <Table.Body className="divide-y">
                {responses?.map((response) => (
                  <div key={response._id}>
                    <Table>
                      <Table.Head>
                        <Table.HeadCell>Responder Name</Table.HeadCell>
                        <Table.HeadCell>Question</Table.HeadCell>
                        <Table.HeadCell>Answer Type</Table.HeadCell>
                        <Table.HeadCell>Answer</Table.HeadCell>
                        <Table.HeadCell>Responded</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {response.answers?.map((answer) => (
                          <Table.Row key={answer._id}>
                            <Table.Cell>
                              {response.respondent.display_name}
                            </Table.Cell>
                            <Table.Cell>
                              {answer.question.question_text}
                            </Table.Cell>
                            <Table.Cell>{answer.answer_type}</Table.Cell>
                            <Table.Cell>
                              {(() => {
                                switch (answer.answer_type) {
                                  case "multiple_choice":
                                  case "single_choice":
                                    return (
                                      <ul>
                                        {answer.selected_options.map(
                                          (option) => (
                                            <li key={option}>{option}</li>
                                          )
                                        )}
                                      </ul>
                                    );
                                  case "text":
                                    return answer.text;
                                  case "time":
                                    return answer.time;
                                  case "date":
                                    return getTimeAgoString(answer.date);
                                  case "true_or_false":
                                    return answer.true_or_false
                                      ? "True"
                                      : "False";
                                  default:
                                    return null;
                                }
                              })()}
                            </Table.Cell>
                            <Table.Cell>
                              {getTimeAgoString(response.createdAt)}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
        {responses.length === 0 && !showShimmer && (
          <p className="mt-5 ml-5 font-semibold text-center">
            No responses to display
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveyResponse;
