const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function runWormGPT(promptText) {
  const browser = await puppeteer.launch({
    headless: chromium.headless,
    executablePath: await chromium.executablePath(),
    args: chromium.args
  });

  const page = await browser.newPage();
  try {
    await page.goto("https://aidark.net/#url=%22%22&activeContact=%22Cyber+Security%22", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector('div[title="Cyber Security"]', { timeout: 15000 });
    await page.click('div[title="Cyber Security"]');

    await page.waitForSelector("textarea");
    await page.type("textarea", promptText);
    await page.keyboard.press("Enter");

    await page.waitForFunction(() => {
      const all = document.querySelectorAll(".message-content");
      return all.length > 0 && all[all.length - 1].innerText.trim().length > 0;
    }, { timeout: 15000 });

    const response = await page.evaluate(() => {
      const messages = document.querySelectorAll(".message-content");
      return messages[messages.length - 1].innerText.trim();
    });

    await browser.close();
    return response;
  } catch (err) {
    await browser.close();
    console.error("❌ خطأ أثناء الوصول:", err);
    return "⚠️ حدث خطأ أثناء الوصول إلى الأداة. يرجى المحاولة لاحقًا.";
  }
}

module.exports = runWormGPT;
