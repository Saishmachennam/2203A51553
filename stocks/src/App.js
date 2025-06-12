import {Component} from "react"
import StockPage from './stocks.js'
class App extends Component{
  render(){
    return(
      <>
      <h1>Stock Price Aggregation Web App</h1>
      <StockPage/>
      </>
    )
  }
}

export default App;
