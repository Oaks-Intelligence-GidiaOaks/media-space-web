import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import { icon_success, icon_error, users } from "../../assets";

function Users() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex gap-10 px-3 pt-5 flex-col lg:flex-row lg:gap-10">
      {user && user.role == "OrgAdmin" ? (
        <>admin section</>
      ) : (
        <>
          <div className="w-full super-admin-card-box flex flex-col items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4">
            <Cards
              title={"89,935"}
              subtitle={"Total users "}
              percentage={"10.2%"}
              img={users}
              icon={icon_success}
              text={"+1.01% this week"}
            />

            <Cards
              title={"23,283.5"}
              subtitle={"New Users"}
              percentage={"10.2%"}
              img={users}
              icon={icon_success}
              text={"+1.01% this week"}
            />

            <Cards
              title={"46,827"}
              subtitle={"Returning Users"}
              percentage={"2.56%"}
              img={users}
              icon={icon_error}
              text={"-0.91% this week"}
            />

            <Cards
              title={"17,854"}
              subtitle={"Inactive Users"}
              percentage={"3.1%"}
              img={users}
              icon={icon_success}
              text={"+0.49% this week"}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
