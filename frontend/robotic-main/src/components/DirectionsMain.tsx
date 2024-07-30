import RobotsCard from "./Directions/RobotsCard";
import ProgramCard from "./Directions/ProgramGamedevCard";
import OgeHolidaysCard from "./Directions/OgeHolidayCards";
import '../css/Directions.css'


const DirectionsMain = () => {
    return (

        <section className="directions-main" aria-labelledby="Наши направления">
            <div className="container-main">
                <h1 className="directions-sign" >Наши направления</h1>
                <RobotsCard />
                <ProgramCard />
                <OgeHolidaysCard />
            </div>
        </section>
    )
}
export default DirectionsMain