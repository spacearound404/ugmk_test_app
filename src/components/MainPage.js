import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useLocalStorage from '../hooks/useLocalStorage';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const MainPage = () => {
  const [data, setData] = useState([]);
  const [barRefs, setBarRefs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterStorage, setFilterStorage] = useLocalStorage('filter', 'all');

  useEffect(() => {
    setFilter(filterStorage);

    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  function compareMonths(a, b) {
    const dateA = new Date(`${a.year}-${a.month}-01`);
    const dateB = new Date(`${b.year}-${b.month}-01`);
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  }

  const chartData = (() => {  
    return data.sort(compareMonths);
  })();


  // Обработка изменения фильтра
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilterStorage(e.target.value)
  };

  const handleBarClick = (data, index, e) => {
    const dataKey = barRefs[index].props.dataKey;
    const factoryId = parseInt(dataKey.match(/factory(\d+)_product\d/)[1], 10);
    const month = data.month;

    window.location.href = `http://localhost:3000/details/${factoryId}/${month}`;
  };
  
  const getBars = () => {
    switch (filter) {
      case 'product1':
        return (
          <>
            <Bar dataKey="factory1_product1" name="Фабрика 1" fill="#8884d8" onClick={(e) => handleBarClick(e, 0)} ref={(ref) => barRefs[0] = ref} />
            <Bar dataKey="factory2_product1" name="Фабрика 2" fill="#82ca9d" onClick={(e) => handleBarClick(e, 1)} ref={(ref) => barRefs[1] = ref} />
          </>
        );
      case 'product2':
        return (
          <>
            <Bar dataKey="factory1_product2" name="Фабрика 1" fill="#8884d8" onClick={(e) => handleBarClick(e, 0)} ref={(ref) => barRefs[0] = ref} />
            <Bar dataKey="factory2_product2" name="Фабрика 2" fill="#82ca9d" onClick={(e) => handleBarClick(e, 1)} ref={(ref) => barRefs[1] = ref} />
          </>
        );
      default:
        return (
          <>
            <Bar dataKey="factory1_product1" name="Фабрика 1 - Продукт 1" fill="#8884d8" onClick={(e) => handleBarClick(e, 0)} ref={(ref) => barRefs[0] = ref} />
            <Bar dataKey="factory2_product1" name="Фабрика 2 - Продукт 1" fill="#82ca9d" onClick={(e) => handleBarClick(e, 1)} ref={(ref) => barRefs[1] = ref} />
            <Bar dataKey="factory1_product2" name="Фабрика 1 - Продукт 2" fill="#FFD700" onClick={(e) => handleBarClick(e, 0)} ref={(ref) => barRefs[0] = ref} />
            <Bar dataKey="factory2_product2" name="Фабрика 2 - Продукт 2" fill="#FF7F50" onClick={(e) => handleBarClick(e, 1)} ref={(ref) => barRefs[1] = ref} />
          </>
        );
    }
  };

  const getMaxY = () => {
    let max = 0;
    chartData.forEach((item) => {
      for (const key in item) {
        if (key.includes('factory') && (key.includes('product1') || key.includes('product2'))) {
          max = Math.max(max, item[key]);
        }
      }
    });
    return max;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 1rem',
        position: 'relative',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'right',
            paddingRight: 30,
          }}
        >
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="all">Все продукты</MenuItem>
            <MenuItem value="product1">Продукт 1</MenuItem>
            <MenuItem value="product2">Продукт 2</MenuItem>
          </Select>
        </div>

        <BarChart
          width={Math.min(window.innerWidth, 1400)}
          height={Math.min(window.innerHeight, 500)}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month_name" isDuplicated={false} interval={1} />
          <YAxis domain={[0, getMaxY()]} />
          <Tooltip />
          <Legend />
          {getBars()}
        </BarChart>
      </div>
    </div>
  );
};

export default MainPage