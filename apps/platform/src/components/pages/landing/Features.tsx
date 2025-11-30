import { useState } from "react";
import {
  Bot,
  Users,
  GitCompare,
  FileText,
  Eye,
  X,
  Shield,
  Chrome,
  AlertTriangle,
} from "lucide-react";

const FeatureShowcase = () => {
  const [lightboxImage, setLightboxImage] = useState<any>(null);

  // Organized your 19 screenshots into logical feature groups
  const featureCategories = [
    {
      id: "auth-teams",
      title: "Authentication & Team Management",
      icon: Shield,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50/50 to-transparent",
      description:
        "Secure JWT-based authentication with role-based access control. Manage teams, assign roles, and collaborate with QA, Testers, and Developers seamlessly.",
      images: [
        {
          id: 1,
          src: "/Img1.png",
          label: "Login & Authentication",
          description:
            "Secure JWT login with role-based access control for Admin and Member roles",
        },
        {
          id: 2,
          src: "/Img2.png",
          label: "Team Dashboard",
          description:
            "Centralized team management with member roles and permissions",
        },
        {
          id: 3,
          src: "/Img3.png",
          label: "Role Management",
          description:
            "Assign and manage team member roles with granular permissions",
        },
      ],
    },
    {
      id: "extension-capture",
      title: "Chrome Extension & DOM Capture",
      icon: Chrome,
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50/50 to-transparent",
      description:
        "Powerful Chrome extension that captures complete DOM snapshots, tracks changes, and provides real-time analysis. Install once, test everywhere.",
      images: [
        {
          id: 4,
          src: "/Img4.png",
          label: "Extension Interface",
          description:
            "Clean, intuitive Chrome extension UI for capturing website snapshots",
        },
        {
          id: 5,
          src: "/Img5.png",
          label: "DOM Snapshot",
          description:
            "Complete DOM structure capture with element hierarchy and attributes",
        },
        {
          id: 6,
          src: "/Img6.png",
          label: "Snapshot History",
          description:
            "Track all captured snapshots with timestamps and metadata",
        },
        {
          id: 7,
          src: "/Img7.png",
          label: "Visual Comparison",
          description:
            "Side-by-side comparison of snapshots to identify changes",
        },
      ],
    },
    {
      id: "ai-chatbot",
      title: "AI-Powered Chatbot & Analysis",
      icon: Bot,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50/50 to-transparent",
      description:
        "Intelligent AI chatbot that understands your DOM structure, answers questions about forms, links, and accessibility issues. Get instant insights about your website.",
      images: [
        {
          id: 8,
          src: "/Img8.png",
          label: "AI Chat Interface",
          description:
            "Natural language queries about DOM structure, forms, and links",
        },
        {
          id: 9,
          src: "/Img9.png",
          label: "Smart Responses",
          description:
            "Context-aware AI responses with actionable recommendations",
        },
        {
          id: 10,
          src: "/Img10.png",
          label: "DOM Insights",
          description:
            "AI analysis of website structure and potential improvements",
        },
      ],
    },
    {
      id: "collaboration",
      title: "Real-time Team Collaboration",
      icon: Users,
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50/50 to-transparent",
      description:
        "WebSocket-powered real-time chat, online/offline status tracking, and instant team notifications. Collaborate without leaving the platform.",
      images: [
        {
          id: 11,
          src: "/Img11.png",
          label: "Live Team Chat",
          description:
            "Real-time WebSocket chat for instant team communication",
        },
        {
          id: 12,
          src: "/Img12.png",
          label: "Online Status",
          description: "See who's online with live presence indicators",
        },
        {
          id: 13,
          src: "/Img13.png",
          label: "Chat History",
          description:
            "Complete conversation history with timestamps and user context",
        },
      ],
    },
    {
      id: "diff-tracking",
      title: "Git-Style Diff & Change Tracking",
      icon: GitCompare,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50/50 to-transparent",
      description:
        "Visual diff tracking with pixel-perfect change detection. See additions in green, removals in red, just like Git diffs but for your UI.",
      images: [
        {
          id: 14,
          src: "/Img14.png",
          label: "Visual Diff View",
          description: "Git-style visual diffs showing additions and removals",
        },
        {
          id: 15,
          src: "/Img15.png",
          label: "Change Detection",
          description:
            "Pixel-level change detection with highlighted modifications",
        },
      ],
    },
    {
      id: "accessibility",
      title: "AI Accessibility Analysis",
      icon: AlertTriangle,
      color: "red",
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50/50 to-transparent",
      description:
        "Gemini AI-powered accessibility scanning with 4-level severity classification. Get automated fix recommendations and actionable insights.",
      images: [
        {
          id: 16,
          src: "/Img16.png",
          label: "A11y Scanner",
          description: "Comprehensive accessibility scan powered by Gemini AI",
        },
        {
          id: 17,
          src: "/Img17.png",
          label: "Issue Severity",
          description:
            "4-level severity classification: Critical, Serious, Moderate, Minor",
        },
        {
          id: 18,
          src: "/Img18.png",
          label: "Fix Recommendations",
          description:
            "AI-generated recommendations with code examples and best practices",
        },
      ],
    },
    {
      id: "reports-viz",
      title: "Reports & DOM Visualization",
      icon: FileText,
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
      bgGradient: "from-teal-50/50 to-transparent",
      description:
        "Automated PDF reports, interactive DOM tree visualization, and weekly analytics. Export and share comprehensive QA reports with your team.",
      images: [
        {
          id: 19,
          src: "/Img19.png",
          label: "DOM Tree & Reports",
          description:
            "Interactive DOM tree visualization with automated PDF report generation",
        },
      ],
    },
  ];

  const Lightbox = () => {
    if (!lightboxImage) return null;

    return (
      <div
        onClick={() => setLightboxImage(null)}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      >
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.label}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {lightboxImage.label}
              </h3>
              <p className="text-gray-600 text-lg">
                {lightboxImage.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Feature Categories - Alternating Layout */}
        <div className="space-y-32">
          {featureCategories.map((category, index) => {
            const Icon = category.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={category.id} className="group relative">
                {/* Floating Background Element */}
                <div
                  className={`absolute ${isEven ? "-left-20" : "-right-20"} top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br ${category.bgGradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
                ></div>

                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Text Content */}
                  <div
                    className={`space-y-6 ${isEven ? "lg:pr-8" : "lg:pl-8 lg:order-2"}`}
                  >
                    <div className="inline-flex items-center space-x-3 mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {category.images.map((img) => (
                        <span
                          key={img.id}
                          className={`px-4 py-2 bg-${category.color}-50 text-${category.color}-700 rounded-full text-sm font-medium border border-${category.color}-100 hover:bg-${category.color}-100 transition-colors cursor-default`}
                        >
                          {img.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div
                    className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div
                      className={`grid gap-4 ${category.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                    >
                      {category.images.map((img, imgIndex) => (
                        <div
                          key={img.id}
                          onClick={() => setLightboxImage(img)}
                          className={`relative group/img cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                            imgIndex === 0 && category.images.length > 1
                              ? "col-span-2"
                              : ""
                          } ${
                            imgIndex === 0 && category.images.length > 1
                              ? "aspect-video"
                              : "aspect-square"
                          }`}
                        >
                          {/* Placeholder with gradient - replace with actual image */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10`}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                            <img
                              src={img.src}
                              alt={img.label}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/60 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-center px-6">
                              <Eye className="h-10 w-10 text-white mx-auto mb-3" />
                              <p className="text-white font-semibold text-lg mb-1">
                                {img.label}
                              </p>
                              <p className="text-white/80 text-sm">
                                {img.description}
                              </p>
                            </div>
                          </div>

                          {/* Image Label Badge */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                              <p className="text-sm font-semibold text-gray-900">
                                {img.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox />
    </section>
  );
};

export default FeatureShowcase;
