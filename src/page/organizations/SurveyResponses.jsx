import { useLocation } from "react-router-dom";
import { useGetResponseQuery } from "../../service/admin/survey.service";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

function SurveyResponses() {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const { data: surveyResponse, isLoading, refetch } = useGetResponseQuery(id);
  console.log(surveyResponse);

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

      <div className="responses"></div>
    </>
  );
}

export default SurveyResponses;
