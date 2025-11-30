import { Button } from "@a11yguard/shared/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@a11yguard/shared/components/card"
import { Badge } from "@a11yguard/shared/components/badge"
import Footer from "../components/layout/Footer"
import {
  Shield,
  Eye,
  Users,
  FileText,
  Chrome,
  CheckCircle,
  Layers,
  TrendingUp,
  Terminal,
  Cpu,
  Braces,
  Scan,
  BrainCircuit,
  Sparkles,
  Target,
  Workflow,
  Star,
  MessageSquare,
  BarChart3,
  Microscope,
  Camera,
  Bot,
  Key,
  UserCheck,
  TreePine,
  Zap,
  Settings,
  Lock,
  Globe,
  Gauge,
  FileCode,
  Lightbulb,
  Search,
  AlertTriangle,
  Plus,
  Minus,
  GitCompare,
  Calendar,
  Award,
  Briefcase,
} from "lucide-react"
import Header from "../components/layout/Header"
import ExtensionCarousel from "../components/pages/landing/ExtensionCarousel"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse opacity-30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/10 to-emerald-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/8 to-green-500/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-green-500/5 via-transparent to-transparent rounded-full animate-pulse"></div>
      </div>

      {/* Modern Navigation */}
      <Header />

      {/* Revolutionary Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-white to-blue-50/40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:32px_32px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]"></div>

        <div className="absolute top-32 left-10 opacity-20 font-mono text-xs text-green-600 animate-float">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-green-200/30">
            <div>const accessibility = true;</div>
            <div>if (accessibility) &#123;</div>
            <div>&nbsp;&nbsp;return "inclusive";</div>
            <div>&#125;</div>
          </div>
        </div>
        <div className="absolute top-48 right-16 opacity-20 font-mono text-xs text-blue-600 animate-float-delayed">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
            <div>$ qag --analyze</div>
            <div>✓ DOM captured</div>
            <div>✓ AI processing</div>
            <div>✓ Report ready</div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left Side - Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-6 py-3 border border-green-200/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <BrainCircuit className="w-5 h-5 text-green-600" />
                    <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm text-green-800 font-medium">Enterprise QA Platform</span>
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs shadow-md">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-heading font-bold text-gray-900 leading-tight">
                  <span className="block relative">
                    Ship Perfect
                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-60"></div>
                  </span>
                  <span className="block text-green-600 relative">
                    Accessibility
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-60"></div>
                  </span>
                  <span className="block text-3xl lg:text-5xl font-medium text-gray-600 mt-2">Every Time</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Enterprise platform with{" "}
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                    JWT authentication
                  </span>
                  ,{" "}
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                    team collaboration
                  </span>
                  , and{" "}
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                    AI-powered insights
                  </span>{" "}
                  for modern development teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r cursor-pointer from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-mono group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Chrome className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">chrome.install()</span>
                </Button>
               
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 font-mono">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-100">
                  <Star className="w-4 h-4 text-green-500 fill-green-500" />
                  <span className="font-medium">--trial=14d</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-100">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="font-medium">--auth=JWT</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-100">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="font-medium">--teams=unlimited</span>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Chrome Extension UI */}
            <ExtensionCarousel />


          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f912_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f912_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 shadow-lg">
              <Cpu className="w-4 h-4 mr-2" />
              Enterprise Features
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 mb-8 leading-tight">
              Complete QA platform for{" "}
              <span className="text-green-600 relative">
                modern teams
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-40"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From JWT authentication to AI-powered insights, everything you need for enterprise-grade accessibility
              testing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <Key className="h-8 w-8 text-blue-600" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-blue-700 transition-colors">
                  JWT Authentication
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Secure role-based authentication with Admin/Member permissions and enterprise-grade security.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Lock className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="font-medium">Role-based permissions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <UserCheck className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="font-medium">Admin/Member roles</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="font-medium">Secure token management</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-purple-700 transition-colors">
                  Team Collaboration
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Multi-member teams with QA, Testers, and Developers working together seamlessly.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50">
                    <Briefcase className="h-4 w-4 text-purple-600 mr-3" />
                    <span className="font-medium">Multi-role teams</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50">
                    <Settings className="h-4 w-4 text-purple-600 mr-3" />
                    <span className="font-medium">Team management</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50">
                    <Workflow className="h-4 w-4 text-purple-600 mr-3" />
                    <span className="font-medium">Collaborative workflows</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <Chrome className="h-8 w-8 text-green-600" />
                  <div className="absolute inset-0 bg-green-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-green-700 transition-colors">
                  Secure Extension
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Authenticated Chrome extension with DOM capture, AI chatbot, and accessibility checks.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50">
                    <Camera className="h-4 w-4 text-green-600 mr-3" />
                    <span className="font-medium">DOM snapshots</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50">
                    <Bot className="h-4 w-4 text-green-600 mr-3" />
                    <span className="font-medium">AI chatbot integration</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50">
                    <Scan className="h-4 w-4 text-green-600 mr-3" />
                    <span className="font-medium">A11y scanning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Chatbot */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <BrainCircuit className="h-8 w-8 text-indigo-600" />
                  <div className="absolute inset-0 bg-indigo-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-indigo-700 transition-colors">
                  AI Chatbot
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Intelligent assistant that answers questions about DOM structure, forms, links, and website info.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50">
                    <Search className="h-4 w-4 text-indigo-600 mr-3" />
                    <span className="font-medium">DOM structure analysis</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50">
                    <MessageSquare className="h-4 w-4 text-indigo-600 mr-3" />
                    <span className="font-medium">Natural language queries</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50">
                    <Globe className="h-4 w-4 text-indigo-600 mr-3" />
                    <span className="font-medium">Website information</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Snapshot Tracking */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <GitCompare className="h-8 w-8 text-orange-600" />
                  <div className="absolute inset-0 bg-orange-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-orange-700 transition-colors">
                  Snapshot Tracking
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Git-style diff tracking with before/after comparisons and pixel-perfect change detection.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
                    <Plus className="h-4 w-4 text-green-600 mr-3" />
                    <span className="font-medium">Green for additions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
                    <Minus className="h-4 w-4 text-red-600 mr-3" />
                    <span className="font-medium">Red for removals</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
                    <Eye className="h-4 w-4 text-orange-600 mr-3" />
                    <span className="font-medium">Pixel-level detection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Analysis */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="absolute inset-0 bg-red-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-red-700 transition-colors">
                  A11y Analysis
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Gemini AI-powered accessibility checks with 4-level severity classification and fix recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <Gauge className="h-4 w-4 text-red-600 mr-3" />
                    <span className="font-medium">4-level severity</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <Lightbulb className="h-4 w-4 text-red-600 mr-3" />
                    <span className="font-medium">AI recommendations</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <CheckCircle className="h-4 w-4 text-red-600 mr-3" />
                    <span className="font-medium">Automated fixes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Reports */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <FileText className="h-8 w-8 text-teal-600" />
                  <div className="absolute inset-0 bg-teal-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-teal-700 transition-colors">
                  Smart Reports
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Automated PDF reports with team assignments, custom issues, and weekly analytics.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-teal-50">
                    <Calendar className="h-4 w-4 text-teal-600 mr-3" />
                    <span className="font-medium">Weekly automation</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-teal-50">
                    <Award className="h-4 w-4 text-teal-600 mr-3" />
                    <span className="font-medium">Issue assignment</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-teal-50">
                    <FileCode className="h-4 w-4 text-teal-600 mr-3" />
                    <span className="font-medium">Custom issues</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DOM Visualization */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <TreePine className="h-8 w-8 text-cyan-600" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-cyan-700 transition-colors">
                  DOM Visualization
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Interactive DOM tree, element counting, and semantic structure analysis for optimization.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-cyan-600 transition-colors p-2 rounded-lg hover:bg-cyan-50">
                    <Layers className="h-4 w-4 text-cyan-600 mr-3" />
                    <span className="font-medium">Interactive DOM tree</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-cyan-600 transition-colors p-2 rounded-lg hover:bg-cyan-50">
                    <BarChart3 className="h-4 w-4 text-cyan-600 mr-3" />
                    <span className="font-medium">Element analytics</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-cyan-600 transition-colors p-2 rounded-lg hover:bg-cyan-50">
                    <Braces className="h-4 w-4 text-cyan-600 mr-3" />
                    <span className="font-medium">Semantic optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 floating-card group hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                  <Zap className="h-8 w-8 text-pink-600" />
                  <div className="absolute inset-0 bg-pink-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                <CardTitle className="text-gray-900 font-heading text-xl group-hover:text-pink-700 transition-colors">
                  AI Insights
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Dual AI recommendations for accessibility fixes and overall website optimization insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50">
                    <Microscope className="h-4 w-4 text-pink-600 mr-3" />
                    <span className="font-medium">A11y optimization</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50">
                    <TrendingUp className="h-4 w-4 text-pink-600 mr-3" />
                    <span className="font-medium">Performance insights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group/item hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50">
                    <Target className="h-4 w-4 text-pink-600 mr-3" />
                    <span className="font-medium">Next steps guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}


      {/* Footer */}
      <Footer />

    </div>
  )
}
