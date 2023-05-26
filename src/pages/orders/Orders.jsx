import CollapsibleTable from "../single/Single";
import Navbar from "../../components/Navbar/Navbar";
import "./orders.scss";


const Orders = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <Navbar />
        
        <div className="ordertable">
          <CollapsibleTable />
        </div>
      </div>
    </div>
  );
};

export default Orders;
