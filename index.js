import puppeteer from "puppeteer";
import express from "express";

const app = express();
const port = 3000;

app.get("/api", async (req, res) => {
  try {
    const main = async () => {
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();

      await page.goto("https://news.ycombinator.com/");

      const data = await page.$$(".athing");
      const limitData = data.slice(0, 30);
      const Array = [];

      for (const article of limitData) {
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
        const scoreText = await page.evaluate(
          (el) => el.textContent,
          scoreElement
        );

        //comments
        const commentsElement = await page.$$(`a[href="item?id=${id}"]`);
        const secondCommentsElement = commentsElement[1];

        const CommentText = secondCommentsElement
          ? await page.evaluate((el) => el.textContent, secondCommentsElement)
          : "No comments";

        Array.push({
          id: id,
          number: numbers,
          title: titles,
          points: scoreText,
          numberComments: CommentText,
        });
      }
      console.log(Array);

      browser.close();
    };
    await main();
    res.json(Array);
  } catch (error) {
    res.status(500).send({ error: "Hubo un error interno en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}/api`);
});
