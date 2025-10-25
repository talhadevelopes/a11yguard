import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { prepareReportData } from "../services/report.service";
import { generateReportHTML } from "../utils/reportHTMLTemplates";
import { generateReportPDF } from "../utils/reportPDF";

export class ReportController {
  static generateReport = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: userId missing" });
      }

      const manualIssues = req.body.manualIssues || [];

      // 1️⃣ Prepare structured report data
      const reportData = await prepareReportData(userId, manualIssues);

      // 2️⃣ Generate HTML content
      const htmlContent = generateReportHTML(reportData);

      // 3️⃣ Convert HTML to PDF
      const pdfBuffer = await generateReportPDF(htmlContent);

      // 4️⃣ Send PDF response
      const filename = `a11yguard-Report-${new Date().toISOString().split("T")[0]}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length.toString());
      res.end(pdfBuffer);
    } catch (error: any) {
      console.error("Failed to generate report PDF:", error.message || error);
      if (!res.headersSent) {
        res
          .status(500)
          .json({
            error: "Failed to generate report PDF",
            message: error.message || error,
          });
      }
    }
  };
}
