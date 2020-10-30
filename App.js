import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import data from './data/data.json';
import company from './data/company.json';
import companyBy from './data/companyByProduct.json';
import employee from './data/employee.json';
import product from './data/product.json';
import team from './data/team.json'


import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import MultipleSelect from './menu';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


import { ResponsiveScatterPlot } from '@nivo/scatterplot'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveScatterPlot = ({ data /* see data tab */ }) => (
  <ResponsiveScatterPlot
    data={data}
    margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
    xScale={{ type: 'linear', min: 0, max: 'auto' }}
    xFormat={function (e) { return e + " kg" }}
    yScale={{ type: 'linear', min: 0, max: 'auto' }}
    yFormat={function (e) { return e + " cm" }}
    blendMode="multiply"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'weight',
      legendPosition: 'middle',
      legendOffset: 46
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'size',
      legendPosition: 'middle',
      legendOffset: -60
    }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 130,
        translateY: 0,
        itemWidth: 100,
        itemHeight: 12,
        itemsSpacing: 5,
        itemDirection: 'left-to-right',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

const MyResponsiveTreeMapHtml = ({ root /* see root tab */ }) => (

  <ResponsiveTreeMapHtml
    root={root}
    identity='name'
    value='pnl'

    leavesOnly={false}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    label={function (e) { return e.name + " " + e.pnl + "%" }}

    labelTextColor={{ from: 'color', modifiers: [['darker', 2.2]] }}
    orientLabel={false}
    parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    nodeOpacity={0.25}
    colors={function (e) { if (e.pnl > 10) { return e.color = 'green' } if (e.pnl <= 10 && e.pnl >= 5) { return e.color = 'yellow' } if (e.pnl <= 5 && e.pnl >= 0) { return e.color = 'red' } }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.3]] }}
    borderWidth={1}
    animate={true}
    motionStiffness={90}
    motionDamping={11}


  />
);
function App() {
  // treemap
  const [mainData, setMainData] = useState({}); //for storage
  const [showData, setShowData] = useState({}); //for representation, filters

  useEffect(() => {
    setMainData(company.root);
    setShowData(calculateNode(company.root));
  }, []) //never update


  function calculateNode(showData, nodes) {
    let nodesStore = [];

    if (!nodes) {
      let lastNode = searchTree(showData);
      console.log(lastNode);//gets only one child, need to be all+
      return lastNode
      // let calkObj = showData.children.map(r => r.children.map(r => r.children.map(r.size = Number(r.pnl))))
      // setShowData(calkObj)
      // showData.root.children.children.size = Number(showData.root.children.children.pnl)//should get children somewhere else, he couldn't get them here
      // console.log('calkObj', calkObj)



    }


  }

  function searchTree(data) {
    if (!data.children) {
      return data
    } else {
      let result = null;
      for (let i = 0; result == null && i < data.children.length; i++) {
        result = searchTree(data.children[i])
      }
      return result;
    }

  }


  function parents(value) {
    switch (value) {
      case 'Company':
        setShowData(company.root);
        calculateNode(setShowData) // function to store nodes sizes
        break
      case 'Product by company':
        setShowData(companyBy.root);
        break
      case 'Product':
        setShowData(product.root);
        break
      case 'Employee':
        setShowData(employee.root)
        break
      case 'Team':
        setShowData(team.root)
        break
      // case 'Desk':
      //   setShowData(desk.root)
      //   break
      // case 'Employee by desk':
      //   setShowData(empByDesk.root)

    }

    // const newObject = { ...showData };
    // newObject.children = filter;
    // setShowData(newObject);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>

            <li>
              <Link to="/bubbles">Bubbles</Link>
            </li>
            <li>
              <Link to="/">TreeMap</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/bubbles">
            <bubbles />
          </Route>
          <Route path="/">
            <TreeMap />
          </Route>

        </Switch>
      </div>
    </Router>
  );

  function bubbles() {
    return (
      <div>
        <h2>bubbles</h2>;
        <div className='App'>

          <div className='wrapper' style={{ height: '800px' }}>
            <MyResponsiveScatterPlot
              data={data}
            />
          </div>
        </div>
      </div>
    )

  }

  function TreeMap() {
    return (
      <div>
        <h2>TreeMap</h2>
        <div className='App'>

          <div className='wrapper' style={{ height: '600px' }}>
            <MultipleSelect parents={parents} /> <MyResponsiveTreeMapHtml
              root={showData}
            />
          </div>
        </div>
      </div>
    );


  }



}

export default App;
