const { chromium } = require("playwright");

async function scrapeZepto(product) {

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://www.zepto.com/search?query=${product}`;

  await page.goto(url, { waitUntil: "networkidle" });

  await page.waitForTimeout(4000);

  const products = await page.evaluate(() => {

    const results = [];

    const cards = document.querySelectorAll("a");

    cards.forEach(card => {

      const name = card.querySelector("h5")?.innerText;
      const price = card.innerText.match(/₹\d+/)?.[0];
      const image = card.querySelector("img")?.src;

      if (name && price) {
        results.push({
          platform: "Zepto",
          name,
          price,
          image
        });
      }

    });

    return results.slice(0,5);
  });

  await browser.close();

  return products;
}

module.exports = scrapeZepto;