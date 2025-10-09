export const generateReportHTML = (data: any) => {
  const escape = (str: any) => {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>a11yguard Comprehensive Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      color: #333;
      line-height: 1.4;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .header h1 {
      color: #007bff;
      margin: 0 0 10px 0;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    .summary-card {
      background: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card h3 {
      margin: 0 0 5px 0;
      font-size: 24px;
      color: #007bff;
    }
    .summary-card p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .section {
      margin: 30px 0;
      page-break-inside: avoid;
    }
    .section h2 {
      color: #007bff;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f8f9fa;
      font-weight: bold;
    }
    .issues-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .issue-card {
      background: #fff;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    .critical { color: #dc3545; }
    .high { color: #fd7e14; }
    .medium { color: #ffc107; }
    .low { color: #28a745; }
    .issue-item {
      background: #f8f9fa;
      margin: 10px 0;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #007bff;
    }
    .issue-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #ddd;
      padding-top: 20px;
    }
    .score-card {
      background: #e0f7fa;
      padding: 20px;
      border: 1px solid #b2ebf2;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
    }
    .score-card h3 {
      margin: 0 0 5px 0;
      font-size: 32px;
      color: #007bff;
    }
    .score-card p {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    .recommendations-list, .deadlines-list {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }
    .recommendations-list li, .deadlines-list li {
      background: #f0f8ff;
      border-left: 4px solid #007bff;
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 5px;
      font-size: 14px;
      color: #333;
    }
    .deadlines-list li strong {
      color: #0056b3;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🛡️ a11yguard Report</h1>
    <p>Generated on ${escape(data.teamInfo.reportDate)} for ${escape(data.teamInfo.userEmail)}</p>
  </div>

  <div class="summary">
    <div class="summary-card">
      <h3>${escape(data.teamInfo.totalWebsites)}</h3>
      <p>Websites</p>
    </div>
    <div class="summary-card">
      <h3>${escape(data.teamInfo.totalMembers)}</h3>
      <p>Members</p>
    </div>
    <div class="summary-card">
      <h3>${escape(data.teamInfo.totalSnapshots)}</h3>
      <p>Snapshots</p>
    </div>
    <div class="summary-card">
      <h3>${escape(data.issuesSummary.total)}</h3>
      <p>Issues</p>
    </div>
  </div>

  <div class="section">
    <h2>✨ Overall Accessibility Health</h2>
    <div class="score-card">
      <h3>${escape(data.teamInfo.overallAccessibilityScore)} / 100</h3>
      <p>Overall Accessibility Score</p>
    </div>
  </div>

  <div class="section">
    <h2>📊 Issues Overview</h2>
    <div class="issues-grid">
      <div class="issue-card">
        <h3 class="critical">${escape(data.issuesSummary.critical)}</h3>
        <p>Critical</p>
      </div>
      <div class="issue-card">
        <h3 class="high">${escape(data.issuesSummary.high)}</h3>
        <p>High</p>
      </div>
      <div class="issue-card">
        <h3 class="medium">${escape(data.issuesSummary.medium)}</h3>
        <p>Medium</p>
      </div>
      <div class="issue-card">
        <h3 class="low">${escape(data.issuesSummary.low)}</h3>
        <p>Low</p>
      </div>
      <div class="issue-card">
        <h3>${data.issuesSummary.recentTrend >= 0 ? "+" : ""}${escape(data.issuesSummary.recentTrend)}</h3>
        <p>30-Day Trend</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>👥 Team Members</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        ${data.memberStats
          .map(
            (member: any) => `
          <tr>
            <td>${escape(member.name)}</td>
            <td>${escape(member.role)}</td>
            <td>${new Date(member.joinedDate).toLocaleDateString()}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>📈 Snapshot Statistics</h2>
    <div class="summary">
      <div class="summary-card">
        <h3>${escape(data.snapshotStats.total)}</h3>
        <p>Total Captured</p>
      </div>
      <div class="summary-card">
        <h3>${escape(data.snapshotStats.last30Days)}</h3>
        <p>Last 30 Days</p>
      </div>
      <div class="summary-card">
        <h3>${escape(data.snapshotStats.avgPerDay)}</h3>
        <p>Avg / Day</p>
      </div>
      <div class="summary-card">
        <h3>${data.snapshotStats.oldestSnapshot ? new Date(data.snapshotStats.oldestSnapshot).toLocaleDateString() : "N/A"}</h3>
        <p>First Snapshot</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>📸 Recent Snapshots</h2>
    <table>
      <thead>
        <tr>
          <th>Website</th>
          <th>Captured At</th>
          <th>Issues Found</th>
          <th>Screenshot</th>
        </tr>
      </thead>
      <tbody>
        ${data.snapshotStats.recentSnapshotsList
          .map(
            (snapshot: any) => `
          <tr>
            <td>${escape(snapshot.websiteName)}</td>
            <td>${new Date(snapshot.capturedAt).toLocaleString()}</td>
            <td>${escape(snapshot.issuesCount)}</td>
            <td>
              ${snapshot.screenshotUrl ? `<a href="${escape(snapshot.screenshotUrl)}" target="_blank">View</a>` : "N/A"}
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>
    
  <div class="section">
    <h2>🚨 Detailed Issues Analysis</h2>
    <p style="margin-bottom: 15px; color: #666; font-style: italic;">
      Top 20 accessibility issues found across your tracked websites.
    </p>
    ${data.detailedIssues
      .map(
        (issue: any, index: number) => `
      <div class="issue-item">
        <span class="issue-badge" style="background-color: ${
          issue.type === "Critical"
            ? "#dc3545"
            : issue.type === "High"
              ? "#fd7e14"
              : issue.type === "Medium"
                ? "#ffc107"
                : "#28a745"
        }">
          ${escape(issue.type || "Unknown")}
        </span>
        <div><strong>${escape(issue.message || issue.description || "No description")}</strong></div>
        <div style="font-size: 13px; color: #555; margin-top: 5px;">
          ${issue.context ? `<strong>Context:</strong> <code>${escape(issue.context)}</code><br>` : ""}
          ${issue.selector ? `<strong>Selector:</strong> <code>${escape(issue.selector)}</code><br>` : ""}
          ${issue.source ? `<strong>Source:</strong> ${escape(issue.source)}<br>` : ""}
          <strong>Assigned To: Frontend Developer
        </div>
      </div>
    `
      )
      .join("")}
  </div>

  ${
    data.manualIssues && data.manualIssues.length > 0
      ? `
  <div class="section">
    <h2>👨‍💼 Admin Assigned Tasks</h2>
    <p style="margin-bottom: 15px; color: #666; font-style: italic;">
      Custom issues and tasks assigned by administrators.
    </p>
    ${data.manualIssues
      .map(
        (issue: any) => `
      <div class="issue-item">
        <span class="issue-badge" style="background-color: ${
          issue.priority === "Critical"
            ? "#dc3545"
            : issue.priority === "High"
              ? "#fd7e14"
              : issue.priority === "Medium"
                ? "#ffc107"
                : "#28a745"
        }">
          ${escape(issue.priority)}
        </span>
        <div><strong>${escape(issue.title)}</strong></div>
        <div style="margin: 8px 0; color: #555;">${escape(issue.description)}</div>
        <div style="font-size: 13px; color: #555; margin-top: 5px;">
          ${issue.website ? `<strong>Website/Page:</strong> ${escape(issue.website)}<br>` : ""}
          ${issue.assignedTo ? `<strong>Assigned To:</strong> ${escape(issue.assignedTo)}<br>` : ""}
          ${issue.dueDate ? `<strong>Due Date:</strong> ${new Date(issue.dueDate).toLocaleDateString()}<br>` : ""}
          <strong>Status:</strong> Pending
        </div>
      </div>
    `
      )
      .join("")}
  </div>
  `
      : ""
  }

  <div class="section">
    <h2>🎯 Recommendations & Next Steps</h2>
    <p style="margin-bottom: 15px; color: #666; font-style: italic;">
      Actionable recommendations to improve your accessibility posture.
    </p>
    <ul class="recommendations-list">
      ${data.recommendations
        .map(
          (rec: string) => `
        <li>${escape(rec)}</li>
      `
        )
        .join("")}
    </ul>

    <h3>🗓️ Key Deadlines & Goals</h3>
    <ul class="deadlines-list">
      ${data.deadlines
        .map(
          (deadline: any) => `
        <li>
          <strong>Goal:</strong> ${escape(deadline.goal)}<br>
          <strong>Target Date:</strong> ${escape(deadline.targetDate)}<br>
          <strong>Assigned To:</strong> ${escape(deadline.assignedTo)}
        </li>
      `
        )
        .join("")}
    </ul>
  </div>
    
  <div class="footer">
    <p><strong>a11yguard</strong> - Accessibility Report</p>
    <p>Generated on ${escape(data.teamInfo.reportDate)}</p>
  </div>
</body>
</html>`;
};
