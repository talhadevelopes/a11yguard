import authRoutes from "./auth.routes";
import websiteRoutes from "./websiteRoutes";
import snapshotRoutes from "./snapshot.routes";
import accessibilityRoutes from "./accessibility.routes";
import memberRoutes from "./member.routes";
import reportRoutes from "./report.routes";
import utilityRoutes from "./utility.routes";
import chatbot from "./chatbot.routes"; // ✅ This should work now



export const routes = {
  auth: authRoutes,
  websites: websiteRoutes,
  snapshots: snapshotRoutes,
  accessibility: accessibilityRoutes,
  chatbot: chatbot, 
  members: memberRoutes,
  reports: reportRoutes,
  utility: utilityRoutes,
};

export default routes;
