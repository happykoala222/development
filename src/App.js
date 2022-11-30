
import './App.css';
import ringData from "./ring-data.json";
import RingItem from './RingItem';
import React from 'react';
import { useState, useEffect } from 'react';
import CartAggregator from './CartAggregator';


function App() {

  // sort by
  const [defaultSort, setDefaultSort] = useState(true);

  // style filters
  const [simpleFilter, setSimpleFilter] = useState(false);
  const [statementFilter, setStatementFilter] = useState(false);

  // material filters
  const [goldFilter, setGoldFilter] = useState(false)
  const [silverFilter, setSilverFilter] = useState(false)
  const [resinFilter, setResinFilter] = useState(false)
  const [porcelainFilter, setPorcelainFilter] = useState(false)
  const [clayFilter, setClayFilter] = useState(false)
  const [cartFilter, setCartFilter] = useState(false)

  // main display
  const [displayItems, setDisplayItems] = useState(ringData)
  const [cartItems, setCartItems] = useState([])
  const [reset, setReset] = useState(false)

  // resets page
  useEffect(() => {
    setSimpleFilter(false)
    setStatementFilter(false)
    setGoldFilter(false)
    setSilverFilter(false)
    setResinFilter(false)
    setPorcelainFilter(false)
    setClayFilter(false)
    setCartFilter(false)
    setCartItems([])
  }, [reset])

  // handles sorting
  useEffect(() => {
    const currentItems = [...displayItems]
    let ret = []

    //sort by popularity
    if(defaultSort) {
      ret = currentItems.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity))
    } else { //sort by price
      ret = currentItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    }
    setDisplayItems(ret)
  }, [defaultSort])


  // applies appropriate filters anytime boxes are checked/unchecked
  useEffect(() => {
    const materials = []
    const styles = []
    if(goldFilter) {
      materials.push('Gold')
    }
    if(silverFilter) {
      materials.push('Silver')
    }
    if(resinFilter) {
      materials.push('Resin')
    }
    if(porcelainFilter) {
      materials.push('Porcelain')
    }
    if(clayFilter) {
      materials.push('Clay')
    }
    if(simpleFilter) {
      styles.push('Simple')
    } 
    if(statementFilter) {
      styles.push('Statement')
    }
    applyFilters(materials, styles, cartFilter)
  }, [goldFilter, silverFilter, resinFilter, porcelainFilter, clayFilter, simpleFilter, statementFilter, cartFilter, cartItems])

  const applyFilters = (materials, styles, filterOn) => {
    const toBeDisplayed = []
    //apply materials filter first
    // const filteredByMaterial = []
    for (let i = 0; i < ringData.length; i++) {
      let item = ringData[i]
      // material and style filters have been applied
      if(materials.length > 0 && styles.length > 0) {
        if(materials.includes(item.material) && styles.includes(item.style)) {
          toBeDisplayed.push(item)
        }
        // only style filters have been applied
      } else if (materials.length === 0 && styles.length > 0) {
        if(styles.includes(item.style)) {
          toBeDisplayed.push(item)
        }
        // only material filters have been applied
      } else if(materials.length > 0 && styles.length === 0) {
        if(materials.includes(item.material)) {
          toBeDisplayed.push(item)
        }
        // no style or material filters have been applied 
      } else if (materials.length === 0 && styles.length ===0) {
        toBeDisplayed.push(item)
      }
    }
    if(filterOn) {
      setDisplayItems(toBeDisplayed.filter((item) => cartItems.includes(item)))
    } else {
      setDisplayItems(toBeDisplayed)
    }
  };

  // checkbox mini component
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} style={{marginRight: '8px'}}/>
        {label}
      </label>
    );
  };

  // radio mini component
  const CircleSelect = ({ label, value, onChange }) => {
    return (
      <label >
        <input type="radio" checked={value} onChange={onChange} style={{marginRight: '8px'}}/>
        {label}
      </label>
    );
  };
  return (
    <div className="App">
      <div className='header'>
        <img className='header-img' src='https://i.pinimg.com/564x/d3/50/c6/d350c6fc6c0fe4a2514d5a7541c41869.jpg'></img>
        <h1>Cushing Street Rings</h1>
      </div>
      <div className='main-body'>
        <div className='sidebar'>
          <div className='reset-group' onClick={() => setReset(!reset)}>
            <p  className='reset'>reset  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg></p>
          </div>
            <div className='sidebar-group'>
            <h3>Sort By</h3>
            <CircleSelect
              label="Popularity (default)"
              value={defaultSort}
              onChange={() => setDefaultSort(!defaultSort)}
            />
            <CircleSelect
              label="Price"
              value={!defaultSort}
              onChange={() => setDefaultSort(!defaultSort)}
            />
          </div>
          <div className='sidebar-group'>
            <h3>Materials</h3>
            <Checkbox
              label="Gold"
              value={goldFilter}
              onChange={() => setGoldFilter(!goldFilter)}
            />
            <Checkbox
              label="Silver"
              value={silverFilter}
              onChange={() => setSilverFilter(!silverFilter)}
            />
            <Checkbox
              eventKey='hi'
              label="Resin"
              value={resinFilter}
              onChange={() => setResinFilter(!resinFilter)}
            />
            <Checkbox
              label="Porcelain"
              value={porcelainFilter}
              onChange={() => setPorcelainFilter(!porcelainFilter)}
            />
            <Checkbox
              label="Clay"
              value={clayFilter}
              onChange={() => setClayFilter(!clayFilter)}
            />
          </div>
          <div className='sidebar-group'>
            <h3>Style</h3>
            <Checkbox
              label="Simple"
              value={simpleFilter}
              onChange={() => setSimpleFilter(!simpleFilter)}
            />
            <Checkbox
              label="Statement"
              value={statementFilter}
              onChange={() => setStatementFilter(!statementFilter)}
            />
          </div>
          <div className='sidebar-group'>
            <h3>Other</h3>
            <Checkbox
              label="My Cart"
              value={cartFilter}
              onChange={() => setCartFilter(!cartFilter)}
            />
          </div>
          {/* Aggregates and displays cart total */}
          <CartAggregator cartItems={cartItems} />
        </div>
        <div className='card-grid'>
          {displayItems && displayItems.map((item, index) => ( 
            <RingItem
            cartItems={cartItems}
            setCartItems={setCartItems}
            item={item}
            />
          ))}
        </div>
      </div>
      <div>
      </div>
  </div>
  );
}

export default App;
