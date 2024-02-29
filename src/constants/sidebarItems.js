import overview from "../assets/sidebar/overview.svg";
import organizations from "../assets/sidebar/organizations.svg";
import subscription from "../assets/sidebar/subscription.svg";
import notifications from "../assets/sidebar/notifications.svg";
import settings from "../assets/sidebar/settings.svg";
import bell from "../assets/sidebar/bell.svg";
import user from "../assets/sidebar/user.svg";
import user_charts from "../assets/sidebar/user-charts.svg";
import money from "../assets/sidebar/money.svg";

const sidebarItems = [
  {
    title: "Overview",
    route: "dashboard/overview",
    icon: overview,
  },
  {
    title: "Users Acquisition",
    route: "dashboard/users",
    icon: user,
  },
  {
    title: "Organizations",
    route: "dashboard/organizations",
    icon: organizations,
  },
  {
    title: "Users charts",
    route: "dashboard/user-charts",
    icon: user_charts,
  },
  {
    title: "Subscription",
    route: "dashboard/subscription",
    icon: money,
  },
  {
    title: "Notifications",
    route: "dashboard/notifications",
    icon: bell,
  },
  {
    title: "Settings",
    route: "dashboard/settings",
    icon: settings,
  },
];

export default sidebarItems;
