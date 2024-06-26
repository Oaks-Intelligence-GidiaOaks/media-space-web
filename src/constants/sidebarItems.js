import overview from "../assets/sidebar/overview.svg";
import organizations from "../assets/sidebar/organizations.svg";
import subscription from "../assets/sidebar/subscription.svg";
import notifications from "../assets/sidebar/notifications.svg";
import settings from "../assets/sidebar/settings.svg";
import bell from "../assets/sidebar/bell.svg";
import user from "../assets/sidebar/user.svg";
import user_charts from "../assets/sidebar/user-charts.svg";
import money from "../assets/sidebar/money.svg";
import pen from "../assets/sidebar/pen.svg";
import psychology from "../assets/sidebar/psychology.svg";

const sidebarItems = [
  {
    title: "Overview",
    route: "dashboard/overview",
    icon: overview,
  },
  {
    title: "Sentiment Analysis",
    route: "dashboard/analysis",
    icon: psychology,
  },
  {
    title: "Create post",
    route: "dashboard/category",
    icon: pen,
  },
  {
    title: "Users Acquisition",
    route: "dashboard/users",
    icon: user,
  },
  // {
  //   title: "Organizations",
  //   route: "dashboard/organizations",
  //   icon: organizations,
  // },
  {
    title: "Staff",
    route: "dashboard/staff",
    icon: user_charts,
  },
  {
    title: "Subscription",
    route: "dashboard/subscription",
    icon: money,
  },
  {
    title: "Survey",
    route: "dashboard/survey",
    icon: bell,
  },
  // {
  //   title: "Settings",
  //   route: "dashboard/settings",
  //   icon: settings,
  // },
];

export default sidebarItems;
