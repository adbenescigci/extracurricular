import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import Events from "../screens/Events";
import Programs from "../screens/Programs";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <ViewListRoundedIcon />,
    label: "Programs",
    route: "/programs",
    element: <Programs />,
  },
  {
    id: 1,
    icon: <AccountBalanceWalletIcon />,
    label: "Events",
    route: "/events",
    element: <Events />,
  },
];
