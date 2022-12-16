const pup = require('puppeteer');
const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";


async function scraping_service (productName) {
    const browser = await pup.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const links = await page.$$eval('.caption > h4 > a', el => el.map(link => link.href));
    const allLaptos = [];
    let filteredLaptops = [];

    for (const link of links){
        await page.goto(link);
        await page.waitForSelector('.caption > h4:nth-child(2)');

        const name = await page.$eval('.caption > h4:nth-child(2)', element => element.innerText);
        const description = await page.$eval('.description', element => element.innerText);
        const reviews = (await page.$eval('.ratings > p', element => element.innerText)).trim();
        let prices = [];


        const buttons = await page.$$('.swatch');
            for(const button of buttons){
                await button.click();
                await button.evaluate(button =>
                    button.classList.contains('btn-primary'));
                    const price = await page.$eval('.caption > h4:nth-child(1)', element => element.innerText);
                    const hdd = await page.$eval('.btn-primary', element => element.innerText);
                    const hdd_preco = {hdd, price};
                    prices.push(hdd_preco);
             }
 
        const obj_laptop ={name, description, reviews, prices}
        allLaptos.push(obj_laptop);
        filteredLaptops = allLaptos.filter(obj => obj.name.includes(productName));
    }
    await browser.close();
    return filteredLaptops;
}
module.exports = { scraping_service };


