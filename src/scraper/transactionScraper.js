const url = 'https://portalpersonas.bancochile.cl/persona/';

const dateIntervalsGenerator = (year) => [
  `01/01/${year} - 31/01/${year}`,
  `01/02/${year} - 28/02/${year}`,
  `01/03/${year} - 31/03/${year}`,
  `01/04/${year} - 30/04/${year}`,
  `01/05/${year} - 31/05/${year}`,
  `01/06/${year} - 30/06/${year}`,
  `01/07/${year} - 31/07/${year}`,
  `01/08/${year} - 31/08/${year}`,
  `01/09/${year} - 30/09/${year}`,
  `01/10/${year} - 31/10/${year}`,
  `01/11/${year} - 30/11/${year}`,
  `01/12/${year} - 31/12/${year}`,
];

const scrape = async (browser, params) => {
  const dateIntervals = dateIntervalsGenerator(params.year);
  let transactionCount = 0;

  // Create new page and set request interception to true
  const page = await browser.newPage();

  // Navigate to url
  console.log(`Navigating to ${url}...`);
  await page.goto(url);

  // Type credentials on input and click on login button
  await page.type('#iduserName', params.user);
  await page.type("input[name='userpassword']", params.password);
  await page.screenshot({ path: 'screenshot1.jpg' });
  await page.click('#idIngresar');

  // Wait for page to load and access transactions view
  await page.waitForSelector('#nivel1-41000');
  await page.click('#nivel1-41000');
  await page.click("a[ui-sref='movimientosCC.movimientos'");
  await page.waitForSelector("bch-button[text='Filtrar']");
  await page.screenshot({ path: 'screenshot2.jpg' });
  // Access filter options
  await page.click("bch-button[text='Filtrar']");

  console.log('User Authenticated');

  // Set response interception
  page.on('response', async (response) => {
    const request = response.request();
    if (request.url() === 'https://portalpersonas.bancochile.cl/mibancochile/rest/persona/movimientos/getcartola') {
      const resObject = await response.json();
      transactionCount += resObject.cantidadMovimientos;
      console.log(resObject.cantidadMovimientos);
    }
  });

  // Iterate over each month
  for (let index = 0; index < dateIntervals.length; index += 1) {
    const dateInterval = dateIntervals[index];
    await page.waitForSelector('bch-datepicker input[id*="mat-input"]');
    await page.focus('bch-datepicker input[id*="mat-input"]');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('bch-datepicker input[id*="mat-input"]', dateInterval);
    await page.click("bch-button[text='Aplicar filtros']");
  }
  await page.waitForTimeout(2000);
  await page.close();
  return transactionCount;
};

const scraperObject = {
  url,
  scrape,
};

module.exports = scraperObject;
