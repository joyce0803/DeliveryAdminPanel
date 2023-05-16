import "./home.scss"


import Navbar from "../../components/Navbar/Navbar"
import Widget from "../../components/Widget/Widget"
import Featured from "../../components/Featured/Featured"
import Chart from "../../components/Chart/Chart"
import List from "../../components/Table/Table"

const Home = ({userCount}) => {
  console.log(userCount)
  return (
    <div className="home" style={{overflowY: 'scroll', height:'100vh'}}>
      
      <div className="homeContainer">
        <Navbar />
        <div className="widgets"> 
          
          <Widget type="user" userCount={userCount} />
          <Widget type="order"/>
          <Widget type="earning"/>
          <Widget type="balance"/> 
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Latest Transactions
            <List />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 
