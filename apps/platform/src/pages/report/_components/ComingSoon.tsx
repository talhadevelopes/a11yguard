import { 
  Calendar, 
  Mail, 
  FileText, 
  Bell, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function ComingSoon() {
  const upcomingFeatures = [
    {
      icon: Calendar,
      title: "Scheduled Reports",
      description: "Automatically generate reports on a schedule",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Mail,
      title: "Email Delivery",
      description: "Send reports directly to team members",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: FileText,
      title: "Custom Templates",
      description: "Create personalized report templates",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Get instant alerts for critical issues",
      color: "from-orange-500 to-amber-600",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-800">🚀 Coming Soon</h3>
          <p className="text-blue-600 text-sm">
            Exciting new features to enhance your reporting experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingFeatures.map((feature, index) => (
          <div
            key={index}
            className="group bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200/50 p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 mb-1">{feature.title}</h4>
                <p className="text-blue-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-xl border border-blue-200/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-blue-800 font-medium text-sm">
              Stay tuned for these amazing updates!
            </p>
            <p className="text-blue-600 text-xs">
              We're constantly working to improve your experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
