import Navbar from '../../components/Navbar/Navbar'
import RestaurentsCards from '../../components/RestaurentCards/RestaurentsCards'
import './restaurents.scss'

const Restaurents = () => {
    return (
        <div className="listRestaurents">
            <div className="listContainer">
                <Navbar />
                <div className="RestaurentCards">
                    <RestaurentsCards />
                    
                </div>
            </div>
        </div>
    )
}

export default Restaurents
