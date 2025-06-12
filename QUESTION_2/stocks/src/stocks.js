import { Component } from 'react';
import Heatmap from './heatmap.js';
import "./stocks.css"

class StockPage extends Component {
  state = { allStocks: {} ,lastStock:[]};

  componentDidMount() {
    this.ReadStocks();
  }

  ReadStocks = async () => {

    const testauthurl="http://20.244.56.144/evaluation-service/auth"
    const userdetails={
        "email":"ramkrishna@abc.edu",
        "name":"ram krishna",
        "rollNo":"aa1bb",
        "accessCode":"xgAsNC",
        "clientID":"d9cbb699-6a27-44a5-8d59-8b1befa816da",
        "clientSecret":"tVJaaaRBSeXcRXeM"
    }
    const options={
        method:"POST",
        body:JSON.stringify(userdetails)
    }

    const authresponse=await fetch(testauthurl,options)
    const authresponsedata=await authresponse.json()
    const access_token=authresponsedata.access_token

    try {
      const ticket = "NVDA";
      const minutes = 10;
      const stocksurl = await fetch(`http://20.244.56.144/evaluation-service/stocks/`);
      const url = await fetch(`http://20.244.56.144/evaluation-service/stocks/${ticket}?minutes=${minutes}`);

      const headers = {
        'Authorization':`Bearer ${access_token}`,
        'Content-Type': 'application/json'
      };

      const stockOptions={
        method:"GET",
        headers
      }
      const stocksResponse=await fetch(url,stockOptions)
      const allstocksResponse= await fetch(stocksurl,stockOptions)
      const allstocksdata=await allstocksResponse.json()
      const lastStocksData = await stocksResponse.json();

      this.setState({
        allStocks:allstocksdata,
        lastStock:lastStocksData
      });

    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  render() {
    const { allStocks,lastStock } = this.state;
    return (
      <div>
        <h1>ALL STOCKS</h1>
        <p>Use the following data to get specific stock details</p>
        <h2>{allStocks.stocks}</h2>
        <h1>LAST STOCK OF SPECIFIC CORPORATION</h1>
        {lastStock.map((each)=>{
           return <Heatmap details={each} key={each.lastUpdatedAt}/>
        })}
      </div>
    );
  }
}

export default StockPage;
