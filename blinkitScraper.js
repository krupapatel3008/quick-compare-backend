const { chromium } = require("playwright");

async function scrapeBlinkit(product) {

  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  });

  await page.goto(`https://blinkit.com/s/?q=${product}`, {
    waitUntil: "domcontentloaded"
  });

  // wait for products
  await page.waitForSelector("img", { timeout: 10000 });

  const products = await page.evaluate(() => {

    const items = [];

    const cards = document.querySelectorAll("div");

    cards.forEach(card => {

      const name = card.querySelector("h3")?.innerText;
      const price = card.innerText.match(/₹\d+/)?.[0];
      const image = card.querySelector("img")?.src;

      if (name && price) {
        items.push({
          platform: "Blinkit",
          name,
          price,
          image
        });
      }

    });

    return items.slice(0,5);
  });

  await browser.close();

  return products;
}

module.exports = scrapeBlinkit;