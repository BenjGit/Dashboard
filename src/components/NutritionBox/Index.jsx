import './style.css'

function NutritionBox(props) {
    return (
        <div className="box-container">
            <div className="info-container">
                <div className="icon-container" style={props.iconContainerStyle}>
                    <img className='icon' src={props.icon} />
                </div>
                <div className="content">
                    <span className='weight'>{props.weight}</span>
                    <span className='text'>{props.nutrients}</span>
                </div>
            </div>
        </div>
    )
    
}

export default NutritionBox