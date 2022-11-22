import { FcHome } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";

import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';

export const SideLinksDash = [
  { name: "ড্যাশবোর্ড", link: "/", icon: <DashboardCustomizeSharpIcon style={{ color: "#099F19" }} /> },
];

export const SideLinksOrg = [
  { name: "সংস্থা সমূহ", link: "allorg" },
  { name: "সংস্থা নিবন্ধন", link: "addorg" },
  { name: "এডভান্সড সার্চ", link: "search" },
];

export const SideLinksUsers = [
  { name: "সকল ব্যবহারকারী", link: "allusers" },
  { name: "ব্যবহারকারী নিবন্ধন", link: "adduser" },
];

export const SideLinksDown = [
  // { name: "Settings", link: "#settings", icon: <FcSettings /> },
];
