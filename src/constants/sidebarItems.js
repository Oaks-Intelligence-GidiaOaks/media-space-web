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
    feature: "",
    roles: ["SuperAdmin", "OrgAdmin"]
  },
  {
    title: "Sentiment Analysis",
    route: "dashboard/analysis",
    icon: psychology,
    feature: "Sentiment Analysis",
    roles: ["OrgAdmin"]
  },
  {
    title: "Create post",
    route: "dashboard/category",
    icon: pen,
    feature: "Category Management",
    roles: ["OrgAdmin"]
  },
  {
    title: "Users Acquisition",
    route: "dashboard/users",
    icon: user,
    feature: "Account Management",
    roles: ["OrgAdmin"]
  },
  {
    title: "Organizations",
    route: "dashboard/organizations",
    icon: organizations,
    feature: "Account Management",
    roles: ["SuperAdmin"]
  },
  {
    title: "Staff",
    route: "dashboard/staff",
    icon: user_charts,
    feature: "Role Allocation",
    roles: ["OrgAdmin"]
  },
  {
    title: "Ads & Subscription",
    route: "dashboard/subscription",
    icon: money,
    feature: "Targeted Advertising",
    roles: ["SuperAdmin", "OrgAdmin"]
  },
  {
    title: "Survey",
    route: "dashboard/survey",
    icon: bell,
    feature: "Survey",
    roles: ["OrgAdmin"]
  },
  {
    title: "Settings",
    route: "dashboard/settings",
    icon: settings,
    feature: "Self Service",
    roles: ["SuperAdmin", "OrgAdmin"]
  }
];

export default sidebarItems;
