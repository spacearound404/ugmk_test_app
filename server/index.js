const express = require('express');
const fs = require('fs');
const csvParse = require('csv-parse');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

let data = {};

let readFileAndParseCSV = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, fileData) => {
      if (err) {
        reject(err);
        return;
      }
      csvParse.parse(fileData, {columns: true, trim: true}, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  });
}

(async () => {
  try {
    data = await readFileAndParseCSV('products.csv');
    
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
})();

function sumProducts(factory_id, month) {
  let totalProduct1 = 0;
  let totalProduct2 = 0;

  data.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemMonth = itemDate.getMonth() + 1;
    const itemFactoryId = parseInt(item.factory_id);

    if (itemFactoryId == factory_id && itemMonth == month) {
      totalProduct1 += parseInt(item.product1);
      totalProduct2 += parseInt(item.product2);
    }
  });

  return { totalProduct1, totalProduct2 };
}

const monthNames = {
  1: "Январь",
  2: "Февраль",
  3: "Март",
  4: "Апрель",
  5: "Май",
  6: "Июнь",
  7: "Июль",
  8: "Август",
  9: "Сентябрь",
  10: "Октябрь",
  11: "Ноябрь",
  12: "Декабрь"
};

function sumProductsByFactory(testData) {
  const summary = {};

  testData.forEach(item => {
    const date = new Date(item.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // const monthYear = `${month}/1/${year}`;

    if (!isNaN(year) && !isNaN(month)) {
      const monthYear = `${year}-${month}`
      const factoryId = item.factory_id;

      if (!summary[factoryId]) {
        summary[factoryId] = {};
      }

      if (!summary[factoryId][monthYear]) {
        summary[factoryId][monthYear] = {
          product1: 0,
          product2: 0,
          month,
          year,
          month_name: monthNames[month],
        };
      }

      summary[factoryId][monthYear].product1 += parseInt(item.product1, 10);
      summary[factoryId][monthYear].product2 += parseInt(item.product2, 10);
    }
  });

  const result = [];

  for (const factoryId in summary) {
    for (const monthYear in summary[factoryId]) {
      const { product1, product2, month, year, month_name } = summary[factoryId][monthYear];
      
      result.push({
        factory_id: factoryId,
        date: monthYear,
        [`factory${factoryId}_product1`]: product1,
        [`factory${factoryId}_product2`]: product2,
        month,
        year,
        month_name,
      });
    }
  }

  return result;
}

app.get('/products', (req, res) => {
  const { factory_id, month } = req.query;
  let filteredData = data;

  if (factory_id) {
    filteredData = filteredData.filter(item => item.factory_id === parseInt(factory_id, 10));
  }

  if (month) {
    filteredData = filteredData.filter(item => {
      const date = new Date(item.date.split('/').reverse().join('-'));
      return (date.getMonth() + 1) === parseInt(month, 10);
    });
  }

  res.json(sumProductsByFactory(filteredData));
});



app.get('/details/:factoryId/:month', (req, res) => {
  const factoryId = req.params.factoryId;
  const month = req.params.month;

  res.json(sumProducts(factoryId, month));
});