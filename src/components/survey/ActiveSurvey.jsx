import {
  useActiveSurveyQuery,
  useDeleteSurveyMutation,
  useEndSurveyMutation
} from "../../service/admin/survey.service";
import Card from "./Card";
import { useEffect } from "react";
import { showAlert } from "../../static/alert";

const ActiveSurvey = () => {
  const { data: activeSurvey, refetch } = useActiveSurveyQuery();
  console.log(activeSurvey);

  console.log(activeSurvey);

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
    <div className="flex flex-wrap gap-5 w-full items-center">
      {[...activeSurvey.data.data]
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((row, idx) => (
          <Card
            id={row?._id}
            key={idx}
            topic={row?.topic}
            desc={row?.description}
            created={row?.createdAt}
            count={0}
            deleteSurvey={handleDeleteSurvey}
            endSurvey={handleEndSurvey}
          />
        ))}
    </div>
  );
};

export default ActiveSurvey;
