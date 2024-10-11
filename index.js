import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/api", async (req, res) => {
  try {
    const main = async (arreglo) => {
      const browser = await puppeteer.launch({
        headless: true
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
        const scoreElement = await page.$(`#score_${id}`);
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
          numberComments: CommentText
        });
      }
      if (Array) {
        console.log("recibido!");
      }

      await browser.close();
      //devuelvo arreglo con datos
      return Array;
    };
    // convierto el arreglo en json
    const article = await main();
    res.json(article);

    console.log("esto es articles", article);
  } catch (error) {
    res.status(500).send({ error: "Hubo un error interno en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}/api`);
});
