import puppeteer from "puppeteer";

export const generateReportPDF = async (htmlContent: string) => {
  let browser = null;
  let page = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--disable-default-apps",
        "--disable-extensions",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
      ],
      timeout: 30000,
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 20000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
      timeout: 20000,
    });

    await page.close();
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    try {
      if (page) await page.close();
      if (browser) await browser.close();
    } catch {}
    throw error;
  }
};
