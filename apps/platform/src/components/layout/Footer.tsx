// src/components/Footer.tsx
import React, { type JSX } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Terminal,
  Github,
  Twitter,
  Slack,
  Mail,
  Rocket,
  Shield,
} from "lucide-react";

function useCount(end: number, duration = 1000) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.floor(t * end));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return value;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Footer(): JSX.Element {
  // demo stats — replace with real values if you'd like
  const snapshots = useCount(12470, 1200);
  const issues = useCount(238, 1200);
  const teams = useCount(12, 1200);

  return (
    <footer className="relative bg-emerald-50">
      {/* Floating CTA card — glassy look (remove backdrop-blur and gradient classes if you don't want glass) */}
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto -translate-y-12 max-w-5xl rounded-3xl bg-gradient-to-r from-white/70 to-emerald-50/60 backdrop-blur-md border border-emerald-100 shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4"
          initial="hidden"
          animate="show"
          variants={cardVariants}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow">
              <Terminal className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Ship higher-quality web experiences
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                One-click snapshots, AI-powered accessibility insights and PDF
                reports — built for teams that care about quality.
              </p>
            </div>
          </div>

          <div className="ml-auto flex gap-3">
            <a
              href="#install"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow"
              aria-label="Install extension"
            >
              <Rocket className="w-4 h-4" />
              Install Extension
            </a>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              aria-label="Request demo"
            >
              Request Demo
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer area */}
      <div className="container mx-auto px-6 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & quick stats (terminal-like) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                PF
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  a11yguard
                </div>
                <div className="text-sm text-slate-600">
                  AI-first QA · Accessibility · Snapshots & Diff
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Snapshots</span>
                <strong className="text-emerald-600">
                  {snapshots.toLocaleString()}
                </strong>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Issues flagged</span>
                <strong className="text-amber-600">
                  {issues.toLocaleString()}
                </strong>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Teams</span>
                <strong className="text-slate-800">
                  {teams.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a
                className="p-2 rounded hover:bg-slate-100"
                href="#"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-slate-700" />
              </a>
              <a
                className="p-2 rounded hover:bg-slate-100"
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-slate-700" />
              </a>
              <a
                className="p-2 rounded hover:bg-slate-100"
                href="#"
                aria-label="Slack"
              >
                <Slack className="w-5 h-5 text-slate-700" />
              </a>
              <a
                className="p-2 rounded hover:bg-slate-100"
                href="#"
                aria-label="Contact"
              >
                <Mail className="w-5 h-5 text-slate-700" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-emerald-600" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#extension">
                  Chrome Extension
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#docs">
                  API Docs
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#integrations">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">
              Developers
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-emerald-600" href="#docs">
                  Documentation
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#cli">
                  CLI Tools
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#sdk">
                  SDK
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#github">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Support & legal */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-emerald-600" href="#help">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#community">
                  Community
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#status">
                  Status
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-600" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Enterprise-grade security · GDPR compliant</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              className="text-sm text-slate-500 hover:text-emerald-600"
              href="#privacy"
            >
              Privacy
            </a>
            <a
              className="text-sm text-slate-500 hover:text-emerald-600"
              href="#terms"
            >
              Terms
            </a>
            <span className="text-sm text-slate-500">
              © {new Date().getFullYear()} a11yguard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
