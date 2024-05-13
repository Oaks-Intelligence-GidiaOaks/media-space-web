import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { Table, Badge, Tabs } from "flowbite-react";
import getTimeAgoString from "../../utils/getTimeAgoString";
// import { BeatLoader } from "react-spinners";

const SurveyResponse = ({ onclose, id }) => {
  const token = useSelector((state) => state.user?.token);
  const [responses, setResponses] = useState([]);
  const [showShimer, setShowShimer] = useState(true);

  useEffect(() => {
    resolve();
  }, [id]);

  const resolve = async () => {
    // try {
    //   const data = await getResponse(id);
    //   console.log("Responses:", data);
    // } catch (error) {
    //   console.error("Error ending survey:", error);
    // }
    // console.log(data);
    // setSubmitting(true);
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
        setShowShimer(false);
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
    <div className="w-screen h-screen flex items-center justify-center rounded-lg">
      <div className="bg-white relative rounded-lg overflow-y-scroll scrollbar-none h-[500px] p-10">
        <div
          className="absolute top-2 right-2 cursor-pointer hover:bg-slate-400"
          onClick={() => onclose()}
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        {/* {responses.length > 0 ? (
          <p>Survey Responses for {id}</p>
        ) : (
          <p>No responses</p>
        )} */}
        {responses.length <= 0 && showShimer ? (
          <ShimmerThumbnail width={400} height={400} />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Responder Name</Table.HeadCell>
                <Table.HeadCell>Answer-Type</Table.HeadCell>
                <Table.HeadCell>Answer</Table.HeadCell>
                {/* <Table.HeadCell>Questons</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell> */}
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
                        <p className="border-b-2">{op.answer_type}</p>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      {data?.answers?.map((op) => {
                        if (op.answer_type.includes("multiple")) {
                          return (
                            <div>
                              {op.selected_options.map((p) => (
                                <p>{p}</p>
                              ))}
                            </div>
                          );
                        }
                        if (op.answer_type.includes("single")) {
                          return (
                            <div>
                              {op.selected_options.map((p) => (
                                <p>{p}</p>
                              ))}
                            </div>
                          );
                        }
                        if (op.answer_type.includes("text")) {
                          return (
                            <div>
                              <p>{op.text || " "}</p>
                            </div>
                          );
                        }
                        if (op.answer_type.includes("time")) {
                          return (
                            <div>
                              <p>{op.time || " "}</p>
                            </div>
                          );
                        }
                        if (op.answer_type.includes("date")) {
                          return (
                            <div>
                              <p>{getTimeAgoString(op.date) || " "}</p>
                            </div>
                          );
                        }
                        if (op.answer_type.includes("true")) {
                          return (
                            <div>
                              <p>
                                {op.true_or_false ? "True" : "False" || " "}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </Table.Cell>
                    {/* <Table.Cell>
                    
                    </Table.Cell>
                    <Table.Cell>
                  
                    </Table.Cell>
                    <Table.Cell className="flex gap-2"></Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
        {responses.length == 0 && !showShimer && (
          <p className="mt-5  ml-5 font-semibold">No responses to display</p>
        )}
      </div>
    </div>
  );
};

export default SurveyResponse;
