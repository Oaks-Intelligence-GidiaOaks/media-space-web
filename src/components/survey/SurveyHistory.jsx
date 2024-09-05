import {
  useSurveyHistoryQuery,
  useDeleteSurveyMutation,
  useEndSurveyMutation
} from "../../service/admin/survey.service";
import Card from "./Card";
import { useEffect, useState } from "react";
import { showAlert } from "../../static/alert";
import { Spinner } from "flowbite-react";

const SurveyHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: activeSurvey,
    refetch,
    isFetching: activeSurveyFetching
  } = useSurveyHistoryQuery({
    page: currentPage,
    page_size: itemsPerPage
  });

  console.log(activeSurvey, "history");

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
                  status={row?.active}
                  badge={true}
                  hideEdit={true}
                />
              ))}
          </div>
        )}

        {/* Pagination Controls */}
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
      </div>
    </>
  );
};

export default SurveyHistory;
