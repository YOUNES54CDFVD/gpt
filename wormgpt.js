const puppeteer = require("puppeteer");

async function runWormGPT(promptText) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  try {
    await page.goto("https://aidark.net/#chatId=%221750797631550%22&activeContact=%22Cyber+Security%22", {
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
    console.error("خطأ:", err);
    return "حدث خطأ أثناء الوصول إلى الذكاء الاصطناعي.";
  }
}

module.exports = runWormGPT;
