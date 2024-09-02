import {
  useSurveyHistoryQuery,
  useDeleteSurveyMutation,
  useEndSurveyMutation
} from "../../service/admin/survey.service";
import Card from "./Card";
import { useEffect, useState } from "react";
import { showAlert } from "../../static/alert";

const SurveyHistory = () => {
  const { data: activeSurvey, refetch } = useSurveyHistoryQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    } else if (deleteError) {
      showAlert(
        "Oops",
        deleteError.data.message || "An error occurred",
        "error"
      );
    }
  }, [deleteSuccess, deleteError, refetch]);

  const [endSurvey, { isSuccess: endSurveySuccess, error: endSurveyError }] =
    useEndSurveyMutation();

  const handleEndSurvey = async (id) => {
    const confirmEnd = window.confirm(
      "Are you sure you want to end this survey?"
    );
    if (!confirmEnd) return;

    try {
      await endSurvey(id);
      console.log("Survey ended successfully");
    } catch (error) {
      console.error("Error ending survey:", error);
    }
  };

  useEffect(() => {
    if (endSurveySuccess) {
      showAlert("", "Survey ended Successfully!", "success");
      refetch();
    } else if (endSurveyError) {
      showAlert(
        "Oops",
        endSurveyError.data.message || "An error occurred",
        "error"
      );
    }
  }, [endSurveySuccess, endSurveyError, refetch]);

  // Pagination logic
  const totalItems = activeSurvey?.data.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = activeSurvey?.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      {paginatedData && paginatedData.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-5 w-full justify-start">
            {paginatedData.map((row, idx) => (
              <Card
                classes="border border-[#BDBDBD] rounded-[12px] w-full md:w-[48%]"
                id={row?._id}
                key={idx}
                badge={true}
                topic={row?.topic}
                desc={row?.description}
                created={row?.createdAt}
                count={0}
                deleteSurvey={handleDeleteSurvey}
                endSurvey={handleEndSurvey}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-5 items-center mt-4 w-full">
            <button
              className={`px-4 py-2 border rounded-[8px] survey-pagination-btn w-[114px] ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>
            <div>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-[8px] ${
                    currentPage === index + 1
                      ? "bg-gray-200 text-gray-900"
                      : "bg-white text-gray-500"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className={`px-4 py-2 border rounded-[8px] survey-pagination-btn w-[88px] ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        </>
      ) : (
        <p>No surveys available.</p>
      )}
    </div>
  );
};

export default SurveyHistory;
