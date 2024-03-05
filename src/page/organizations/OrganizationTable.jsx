import OrgGrid from "../../components/grid/OrgGrid";
import OrgGridSort from "../../components/grid/OrgGridSort";

function OrganizationTable() {
  return (
    <div className="px-5 py-8">
      {/* <OrgGrid /> */}
      <OrgGridSort title={"Organizations"} />
    </div>
  );
}

export default OrganizationTable;
