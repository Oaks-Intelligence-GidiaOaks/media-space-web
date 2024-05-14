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
              <Table.Head>
                <Table.HeadCell>Responder Name</Table.HeadCell>
                <Table.HeadCell>Answer-Type</Table.HeadCell>
                <Table.HeadCell>Answer</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {responses?.map((data) => (
                  <Table.Row
                    key={data._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{data?.respondent?.display_name}</Table.Cell>
                    <Table.Cell>
                      {data?.answers?.map((op) => (
                        <p className="border-b-2" key={op._id}>
                          {op.answer_type}
                        </p>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      {data?.answers?.map((op) => (
                        <div key={op._id}>
                          {(() => {
                            switch (op.answer_type) {
                              case "multiple_choice":
                              case "single_choice":
                                return (
                                  <div>
                                    {op.selected_options.map((p) => (
                                      <p key={p}>{p}</p>
                                    ))}
                                  </div>
                                );
                              case "text":
                                return <p>{op.text || " "}</p>;
                              case "time":
                                return <p>{op.time || " "}</p>;
                              case "date":
                                return (
                                  <p>{getTimeAgoString(op.date) || " "}</p>
                                );
                              case "true_false":
                                return (
                                  <p>{op.true_or_false ? "True" : "False"}</p>
                                );
                              default:
                                return null;
                            }
                          })()}
                        </div>
                      ))}
                    </Table.Cell>
                  </Table.Row>
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
