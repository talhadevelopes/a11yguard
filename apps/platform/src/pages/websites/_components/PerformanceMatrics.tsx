// src/components/PM.tsx
import React from 'react';
import { Gauge, Zap } from 'lucide-react';

interface PerformanceMetricsProps {
  snapshot: any;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ snapshot }) => {
  // Debug what we're actually receiving
  console.log("=== PM DEBUG ===");
  console.log("Snapshot received:", snapshot);
  console.log("Snapshot keys:", Object.keys(snapshot || {}));
  
  // Check all possible locations for the data
  const performance = 
    snapshot?.performance || 
    snapshot?.metadata?.performance || 
    (typeof snapshot?.metadata === 'string' ? JSON.parse(snapshot.metadata)?.performance : undefined);
  
  const elementCounts = 
    snapshot?.elementCounts || 
    snapshot?.metadata?.elementCounts || 
    (typeof snapshot?.metadata === 'string' ? JSON.parse(snapshot.metadata)?.elementCounts : undefined);
  
  console.log("Performance found:", performance);
  console.log("Element counts found:", elementCounts);
  console.log("===========================");

  // Return null if no data is available
  if (!performance && !elementCounts) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="rounded-xl border border-green-100/60 bg-white/70 backdrop-blur p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-green-700">
            <Gauge className="w-3.5 h-3.5 text-green-600" />
            Performance Metrics
          </div>
        </div>

        {/* Element counts as badges */}
        {elementCounts && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[10px] border border-blue-100">
              {elementCounts.headings || 0}h
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-[10px] border border-green-100">
              {elementCounts.paragraphs || 0}p
            </span>
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-[10px] border border-purple-100">
              {elementCounts.links || 0}l
            </span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-[10px] border border-amber-100">
              {elementCounts.inputs || 0}i
            </span>
            <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md text-[10px] border border-rose-100">
              {elementCounts.buttons || 0}b
            </span>
            <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-md text-[10px] border border-yellow-100">
              {elementCounts.forms || 0}f
            </span>
          </div>
        )}

        {/* Performance timing */}
        {performance && (
          <div className="inline-flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
              <Zap className="w-3 h-3" />
            </span>
            <span>
              { performance.totalElements || 0} elements in { performance.captureTime || 0}ms
              {" "}
              (<span className="font-semibold">{ performance.elementsPerSecond || 0}</span> el/sec)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;