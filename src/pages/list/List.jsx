import Datatable from '../../components/Datatable/Datatable';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './list.scss';

const List = () => {
  return (
    <div className='list'>
      {/* <Sidebar /> */}
      <div className='listContainer'>
        <Navbar />
        
        <div className='listTable'>
          <Datatable />
        </div>
        
      </div>
    </div>
  )
}

export default List
