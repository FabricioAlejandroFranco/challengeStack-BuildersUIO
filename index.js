import puppeteer from "puppeteer";

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://news.ycombinator.com/");

  const data = await page.$$(".athing");
  const Array = [];

  for (const article of data) {
    const id = await page.evaluate((el) => el.getAttribute("id"), article);

    const titles = await page.evaluate(
      (el) => el.querySelector("td > span > a").textContent,
      article
    );

    const numbers = await page.evaluate(
      (el) => el.querySelector(".athing > .title > .rank").innerText,
      article
    );
    // el primero encontrado $
    const scoreElement = await page.$(".score");

    const scoreText = await page.evaluate((el) => el.textContent, scoreElement);

    Array.push({
      id: id,
      number: numbers,
      title: titles,
      points: scoreText,
      numberComments: [],
    });

    console.log(Array);
  }

  await browser.close();
};

main();
