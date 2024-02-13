import overview from "../assets/sidebar/overview.svg";
import organizations from "../assets/sidebar/organizations.svg";
import subscription from "../assets/sidebar/subscription.svg";
import notifications from "../assets/sidebar/notifications.svg";
import settings from "../assets/sidebar/settings.svg";

const sidebarItems = [
  {
    title: "Overview",
    route: "dashboard/overview",
    icon: overview,
  },
  {
    title: "Organizations",
    route: "dashboard/organizations",
    icon: organizations,
  },
  {
    title: "Subscription",
    route: "dashboard/subscription",
    icon: subscription,
  },
  {
    title: "Notifications",
    route: "dashboard/notifications",
    icon: notifications,
  },
  {
    title: "Settings",
    route: "dashboard/settings",
    icon: settings,
  },
];

export default sidebarItems;
