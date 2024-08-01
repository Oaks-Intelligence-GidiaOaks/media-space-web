import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import "./style.css";
import { Dropdown, DropdownItem, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { showAlert } from "../../static/alert";
import PaginationControls from "./PaginationControls";
import { empty } from "../../assets";
import bell from "../../assets/notiBell.svg";
import {
  useSubscriptionStatsQuery,
  useSubscriptionHistoryQuery,
  useLazyCancelSubscriptionQuery,
  useLazyRenewSubscriptionQuery,
  useGetUserPlansQuery,
  useUpgradeSubscriptionMutation
} from "../../service/admin/sub.service";
import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";
import { MdOutlineAutorenew } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../static/logout";
import { Modal } from "flowbite-react";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import rtkMutation from "../../utils/rtkMutation";

const constraints = {
  plan_type: {
    presence: true
  },
  plan: {
    presence: true
  }
};

function History() {
  const user = useSelector((state) => state.user.user);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const { data: planQuery } = useGetUserPlansQuery();
  const planData = planQuery?.data;

  const { data, isLoading } = useSubscriptionStatsQuery();
  const [triggerRenew, { isSuccess: renewSuccess }] =
    useLazyRenewSubscriptionQuery();
  const [triggerCancel, { isSuccess: cancelSuccess }] =
    useLazyCancelSubscriptionQuery();

  const dispatch = useDispatch();

  const paymentStats = data?.data;
  console.log(paymentStats);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  const {
    data: history,
    isFetching,
    refetch
  } = useSubscriptionHistoryQuery({
    filter,
    page,
    page_size: pageSize
  });
  const list = history?.data?.data || [];
  const totalPages = Math.ceil(page / history?.data?.page_size);

  const handleAction = async (id, action) => {
    console.log(id, action);

    switch (action) {
      case "renew": {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to renew your current plan?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, renew it!",
          cancelButtonText: "No, keep it"
        });

        if (result.isConfirmed) {
          console.log("renew plan");
          triggerRenew();
          if (renewSuccess) {
            showAlert("Plan renewed successfully", "", "success");
            handleLogout(dispatch);
          } else {
            showAlert("Failed to renew", "Pls try again", "error");
          }
        }
        break;
      }
      case "cancel": {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to cancel your current plan?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel it!",
          cancelButtonText: "No, keep it"
        });

        if (result.isConfirmed) {
          console.log("cancel plan");
          triggerCancel();
          if (cancelSuccess) {
            showAlert("Plan renewed successfully", "", "success");
            handleLogout(dispatch);
          } else {
            showAlert("Failed to renew", "Pls try again", "error");
          }
        }
        break;
      }

      default:
        break;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toISOString().split("T")[0];
  };

  const [upgradeSub, { isSuccess, error }] = useUpgradeSubscriptionMutation();

  const onSubmit = async (values) => {
    const d = { plan_id: values.plan, plan_type: values.plan_type };
    await rtkMutation(upgradeSub, d);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      showAlert("Plan upgraded successfully", "", "success");
      setUpgradeModal(false);
      handleLogout(dispatch);
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, dispatch, refetch]);

  const plan_id = user?.organization_id?.plan_id;
  // console.log(plan_id);

  return (
    <div className="px-3 pt-5">
      <div className="">
        {user && user.role == "OrgAdmin" ? (
          <>
            <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              ) : (
                <>
                  <Cards
                    title={
                      paymentStats?.total_subscription?.currency === "NGN"
                        ? `₦${paymentStats?.total_subscription?.total}`
                        : `$${paymentStats?.total_subscription?.total}`
                    }
                    subtitle={"Total Subscriptions"}
                    percentage={""}
                    img={bell}
                    icon={""}
                    text={""}
                  />

                  <Cards
                    title={
                      paymentStats?.current_plan?.currency === "NGN"
                        ? `₦${paymentStats?.current_plan?.amount || 0}`
                        : `$${paymentStats?.current_plan?.amount || 0}`
                    }
                    subtitle={"Current Plan"}
                    percentage={""}
                    img={bell}
                    icon={""}
                    text={paymentStats?.current_plan?.name}
                  />

                  <Cards
                    title={
                      paymentStats?.previous_plan?.currency === "NGN"
                        ? `₦${paymentStats?.previous_plan?.amount || 0}`
                        : `$${paymentStats?.previous_plan?.amount || 0}`
                    }
                    subtitle={"Previous Plan"}
                    percentage={""}
                    img={bell}
                    icon={""}
                    text={paymentStats?.previous_plan?.name}
                  />
                </>
              )}
            </div>

            <div className="table-section pt-10">
              <select
                className="rounded-md h-[39px] bg-white border shadow border-[#EFF0F6] history-filter focus:outline-none focus:ring-0 mb-2 w-auto"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="yearly">Yearly Subscriptions</option>
                <option value="monthly">Monthly Subscriptions</option>
                <option value="active">Active Subscriptions</option>
                <option value="expired">Expired Subscriptions</option>
              </select>
              {isFetching ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              ) : (
                <div className="overflow-x-auto shadow-lg">
                  {list && list.length > 0 ? (
                    <>
                      <Table hoverable>
                        <Table.Head className="users-table-head">
                          <Table.HeadCell>s/n.</Table.HeadCell>
                          <Table.HeadCell>Subscription Date</Table.HeadCell>
                          <Table.HeadCell>Plan/Type</Table.HeadCell>
                          <Table.HeadCell>Exp. Date</Table.HeadCell>
                          <Table.HeadCell>Amount</Table.HeadCell>
                          <Table.HeadCell>Payment Gateway</Table.HeadCell>
                          <Table.HeadCell>Status</Table.HeadCell>
                          <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>

                        <>
                          <Table.Body className="divide-y">
                            {list?.map(
                              (row, index) => (
                                console.log(row),
                                (
                                  <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800 users-table-row"
                                    key={row._id}
                                  >
                                    <Table.Cell>
                                      {row.index || index + 1}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {formatDate(row.subscription_date)}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {row.plan_name} - {row.plan_type}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {formatDate(row.expiry_date)}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {row.currency === "NGN"
                                        ? `₦${row?.amount}`
                                        : `$${row?.amount}`}
                                    </Table.Cell>
                                    <Table.Cell>{row.gateway}</Table.Cell>
                                    <Table.Cell>
                                      {row.status === "Active" ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-[#34C759] ring-1 ring-inset gap-1 ring-green-600/20">
                                          <span className="h-[8px] w-[8px] bg-[#34C759] rounded-full"></span>{" "}
                                          Active
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-[#FF0000] ring-1 gap-1  ring-inset ring-red-600/10">
                                          <span className="h-[8px] w-[8px] bg-[#FF0000] rounded-full"></span>{" "}
                                          Expired
                                        </span>
                                      )}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {row.status === "Active" ? (
                                        <Dropdown>
                                          <DropdownItem
                                            onClick={() =>
                                              setUpgradeModal(true)
                                            }
                                          >
                                            <div className="flex items-center justify-center">
                                              <GrUpgrade
                                                className="text-[#34C759]"
                                                size={20}
                                              />
                                              &nbsp;
                                              <small>
                                                <p className="text-[#34C759]">
                                                  Upgrade Plan
                                                </p>
                                              </small>
                                            </div>
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() =>
                                              handleAction(row._id, "renew")
                                            }
                                          >
                                            <div className="flex items-center justify-center">
                                              <MdOutlineAutorenew
                                                className="text-blue-500"
                                                size={20}
                                              />
                                              &nbsp;
                                              <small>
                                                <p className="text-blue-500">
                                                  Renew Plan
                                                </p>
                                              </small>
                                            </div>
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() =>
                                              handleAction(row._id, "cancel")
                                            }
                                          >
                                            <div className="flex items-center justify-center">
                                              <TiDelete
                                                className="text-[#E71D36]"
                                                size={20}
                                              />
                                              &nbsp;
                                              <small>
                                                <p className="text-[#E71D36]">
                                                  Cancel Plan
                                                </p>
                                              </small>
                                            </div>
                                          </DropdownItem>
                                        </Dropdown>
                                      ) : null}
                                    </Table.Cell>
                                  </Table.Row>
                                )
                              )
                            )}
                          </Table.Body>
                        </>
                      </Table>
                      <PaginationControls
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 pb-20">
                      <p className="pb-5">No data yet</p>
                      <img src={empty} width={200} height={200} alt="" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>

      {upgradeModal && (
        <Modal
          show={upgradeModal}
          onClose={() => setUpgradeModal(false)}
          size={"xl"}
        >
          <Modal.Header>Update Plan</Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="department" className="badge-label pb-2">
                      Select new Plan
                    </label>
                    <Field
                      id="plan_id"
                      type="text"
                      name="plan"
                      component="select"
                      className="badge-department"
                    >
                      <option value="">Select Plan</option>
                      {planData
                        .filter((row) => row?._id !== plan_id)
                        .map((row, index) => (
                          <option key={index} value={row?._id}>
                            {row?.name}
                          </option>
                        ))}
                    </Field>
                    {form.getState().submitFailed &&
                      form.getState().errors.plan && (
                        <small className="text-red-600">
                          {form.getState().errors.plan}
                        </small>
                      )}
                  </div>
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="department" className="badge-label pb-2">
                      Select Plan type
                    </label>
                    <Field
                      id="plan_type"
                      type="text"
                      name="plan_type"
                      component="select"
                      className="badge-department"
                    >
                      <option value="">Select billing period</option>
                      <option value="monthly">Monthly</option>
                      <option value="annually">Yearly</option>
                    </Field>
                    {form.getState().submitFailed &&
                      form.getState().errors.plan_type && (
                        <small className="text-red-600">
                          {form.getState().errors.plan_type}
                        </small>
                      )}
                  </div>

                  <div className="flex justify-end pt-5">
                    <button type="submit" className="badge-create">
                      {submitting ? (
                        <>
                          <span className="loading-dots">
                            <span className="loading-dots-dot"></span>
                            <span className="loading-dots-dot"></span>
                            <span className="loading-dots-dot"></span>
                          </span>
                        </>
                      ) : (
                        "Upgrade"
                      )}
                    </button>
                  </div>
                </form>
              )}
            />{" "}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default History;
