import dumbbell from "../../assets/dumbbell.svg"
import bike from "../../assets/bike.svg"
import swim from "../../assets/swim.svg"
import meditate from "../../assets/meditate.svg"
import './style.css'


function VleftMenu() {
    return (
        <nav className="vl-menu-container">
            <div className="img-containers">
                <div className="img-container">
                    <img className='home-logo' src={dumbbell} />
                </div>
                <div className="img-container">
                    <img className='home-logo' src={bike} />
                </div>
                <div className="img-container"> 
                    <img className='home-logo' src={swim} />
                </div>
                <div className="img-container">
                    <img className='home-logo' src={meditate} />
                </div>
            </div>
            <div className="text-container">
                <span className="copyright">Copyright, SportSee 2020</span>
            </div> 
        </nav>
    )
}

export default VleftMenu