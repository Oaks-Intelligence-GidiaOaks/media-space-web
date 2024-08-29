import { useActiveSurveyQuery } from "../../service/admin/survey.service";

const ActiveSurvey = () => {
  const {
    data: activeSurvey,
    isLoading: activeSurveyloading,
    refetch: activeSurveyRefetch
  } = useActiveSurveyQuery();

  return <div>ActiveSurvey</div>;
};

export default ActiveSurvey;
