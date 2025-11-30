import authRoutes from "./auth.routes";
import websiteRoutes from "./websiteRoutes";
import snapshotRoutes from "./snapshot.routes";
import accessibilityRoutes from "./accessibility.routes";
import memberRoutes from "./member.routes";
import chatbot from "./chatbot.routes";
import messagesRoutes from "./messages.routes";
import presenceRoutes from "./presence.routes";



export const routes = {
  auth: authRoutes,
  websites: websiteRoutes,
  snapshots: snapshotRoutes,
  accessibility: accessibilityRoutes,
  chatbot: chatbot, 
  members: memberRoutes,
  messages: messagesRoutes,
  presence: presenceRoutes,
};

export default routes;
