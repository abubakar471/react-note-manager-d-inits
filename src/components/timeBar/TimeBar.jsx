import "./TimeBar.css";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
const TimeBar = () => {
    let date = new Date();
    return (
        <>
            <div className="timeBar">
                <div className="time">
                    <span><AccessTimeFilledIcon className="timeIcon" />Today : {new Date(date).toDateString()}</span>
                </div>
            </div>
        </>
    )
}

export default TimeBar;