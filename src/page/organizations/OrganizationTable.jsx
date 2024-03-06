import OrgGrid from "../../components/grid/OrgGrid";
import OrgGridSort from "../../components/grid/OrgGridSort";
import { useGetOrganizationQuery } from "../../service/organization.service";

function OrganizationTable() {
  const { data } = useGetOrganizationQuery();
  // console.log(data);

  return (
    <div className="px-5 py-8">
      {/* <OrgGrid /> */}
      {!data ? (
        <p>Fetching Data</p>
      ) : (
        <OrgGridSort title={"Organizations"} data={data} />
      )}
    </div>
  );
}

export default OrganizationTable;
