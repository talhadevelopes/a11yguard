import authRoutes from "./authRoutes";
import websiteRoutes from "./websiteRoutes";
import snapshotRoutes from "./snapshotRoutes";
import accessibilityRoutes from "./accessibilityRoutes";
import chatRoutes from "./chatRoutes";
import memberRoutes from "./memberRoutes";
import reportRoutes from "./reportRoutes";
import utilityRoutes from "./utilityRoute";

export const routes = {
  auth: authRoutes,
  websites: websiteRoutes,
  snapshots: snapshotRoutes,
  accessibility: accessibilityRoutes,
  chat: chatRoutes,
  members: memberRoutes,
  reports: reportRoutes,
  utility: utilityRoutes,
};

export default routes;