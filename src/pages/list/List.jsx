import Datatable from '../../components/Datatable/Datatable';
import Navbar from '../../components/Navbar/Navbar';
import './list.scss';

const List = () => {
  return (
    <div className='list'>
      
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
