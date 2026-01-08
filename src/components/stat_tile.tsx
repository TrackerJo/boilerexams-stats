
import "./stat_tile.css";

type StatTileProps = {
    stat: string,
    title: string,
    subtitle?: string,
    color: string
}

const StatTile = ({ stat, title, subtitle, color }: StatTileProps) => {


    return (
        <div className="stat-tile">
            <h3 className={`stat ${color}`} >{stat}</h3>
            <h3 className="title">{title}</h3>
            {subtitle && <label htmlFor="" className="subtitle">{subtitle}</label>}
        </div>
    )
}

export default StatTile