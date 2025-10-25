import { User, Member, Website, Snapshot, AccessibilityIssue } from "../models";

export interface ReportData {
  teamInfo: any;
  memberStats: any[];
  snapshotStats: any;
  issuesSummary: any;
  detailedIssues: any[];
  manualIssues: any[];
  recommendations: string[];
  deadlines: any[];
}

export const prepareReportData = async (
  userId: string,
  manualIssues: any[] = []
): Promise<ReportData> => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const members = await Member.find({ userId })
    .sort({ createdAt: -1 });

  const websites = await Website.find({ userId })
    .sort({ createdAt: -1 });

  const snapshots = await Snapshot.find({ userId })
    .sort({ capturedAt: -1 })
    .limit(50);
    
  // Get accessibility issues for each snapshot
  const snapshotsWithIssues: any[] = await Promise.all(
    snapshots.map(async (snapshot) => {
      const accessibilityIssues = await AccessibilityIssue.find({
        snapshotId: snapshot._id.toString()
      });
      const website = await Website.findById(snapshot.websiteId);
      return {
        ...snapshot.toObject(),
        website,
        accessibilityIssues
      };
    })
  );

  // Helper: accessibility score
  const calculateAccessibilityScore = (issues: any[]) => {
    const critical = issues.filter((i) => i.type === "Critical").length;
    const high = issues.filter((i) => i.type === "High").length;
    const medium = issues.filter((i) => i.type === "Medium").length;
    const low = issues.filter((i) => i.type === "Low").length;

    let score = 100;
    score -= critical * 10;
    score -= high * 5;
    score -= medium * 2;
    score -= low * 1;

    return Math.max(0, score);
  };

  let allIssues: any[] = [];
  const websiteStats: any[] = [];

  const memberStats = members.map((member) => ({
    name: member.name,
    role: member.role,
    joinedDate: member.createdAt,
    memberId: member.memberId,
  }));

  for (const website of websites) {
    const websiteSnapshots = snapshotsWithIssues.filter((s) => s.website?._id?.toString() === website._id.toString());

    let websiteIssues: any[] = [];
    let lastSnapshot: any = null;

    for (const snapshot of websiteSnapshots) {
      if (snapshot.accessibilityIssues) websiteIssues.push(...snapshot.accessibilityIssues);
      if (!lastSnapshot || new Date(snapshot.capturedAt) > new Date(lastSnapshot.capturedAt)) {
        lastSnapshot = snapshot;
      }
    }

    allIssues.push(...websiteIssues);

    websiteStats.push({
      name: website.name,
      url: website.url,
      totalSnapshots: websiteSnapshots.length,
      totalIssues: websiteIssues.length,
      critical: websiteIssues.filter((i: any) => i.type === "Critical").length,
      high: websiteIssues.filter((i: any) => i.type === "High").length,
      medium: websiteIssues.filter((i: any) => i.type === "Medium").length,
      low: websiteIssues.filter((i: any) => i.type === "Low").length,
      lastChecked: lastSnapshot?.capturedAt || website.createdAt,
      isActive: website.isActive,
    });
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const recentSnapshots = snapshotsWithIssues.filter((s) => new Date(s.capturedAt) >= thirtyDaysAgo);
  const previousSnapshots = snapshotsWithIssues.filter(
    (s) => new Date(s.capturedAt) >= sixtyDaysAgo && new Date(s.capturedAt) < thirtyDaysAgo
  );

  const recentIssues = recentSnapshots.reduce(
    (acc, s) => acc + (s.accessibilityIssues?.length || 0),
    0
  );
  const previousIssues = previousSnapshots.reduce(
    (acc, s) => acc + (s.accessibilityIssues?.length || 0),
    0
  );

  const overallAccessibilityScore = calculateAccessibilityScore(allIssues);

  return {
    teamInfo: {
      userEmail: user.email,
      totalMembers: members.length,
      totalWebsites: websites.length,
      totalSnapshots: snapshotsWithIssues.length,
      reportDate: new Date().toLocaleDateString(),
      accountCreated: user.createdAt,
      overallAccessibilityScore,
    },
    memberStats,
    snapshotStats: {
      total: snapshotsWithIssues.length,
      last30Days: recentSnapshots.length,
      avgPerDay: Math.round(recentSnapshots.length / 30),
      oldestSnapshot: snapshotsWithIssues[snapshotsWithIssues.length - 1]?.capturedAt,
      newestSnapshot: snapshotsWithIssues[0]?.capturedAt,
      recentSnapshotsList: snapshotsWithIssues.slice(0, 10).map((s) => ({
        websiteName: s.website?.name || "N/A",
        capturedAt: s.capturedAt,
        issuesCount: s.accessibilityIssues?.length || 0,
      })),
    },
    issuesSummary: {
      total: allIssues.length,
      critical: allIssues.filter((i) => i.type === "Critical").length,
      high: allIssues.filter((i) => i.type === "High").length,
      medium: allIssues.filter((i) => i.type === "Medium").length,
      low: allIssues.filter((i) => i.type === "Low").length,
      recentTrend: recentIssues - previousIssues,
    },
    detailedIssues: allIssues.slice(0, 20),
    manualIssues,
    recommendations: [
      "Prioritize fixing Critical and High severity issues on your most active websites.",
      "Schedule regular accessibility audits, ideally weekly or bi-weekly, for key pages.",
      "Ensure all new features and content are developed with accessibility in mind from the start.",
      "Conduct user testing with assistive technologies to identify real-world usability issues.",
    ],
    deadlines: [
      {
        goal: "Achieve an overall accessibility score of 90+ for all active websites.",
        targetDate: "Q1 2026",
        assignedTo: "Team Lead",
      },
      {
        goal: "Resolve all Critical issues on the 'Homepage' website.",
        targetDate: "End of next sprint",
        assignedTo: "QA Team",
      },
    ],
  };
};
