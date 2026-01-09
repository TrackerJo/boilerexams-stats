import "./large_stat_tile.css"
import Up from "../assets/up.png"
import Down from "../assets/down.png"
import { useState } from "react"

type LargeStatTileProps = {
    title: string,
    headers: string[],
    items: Map<string, string>[],
    itemColors: string[],
    tooltips: string[],
    sort: (header: string, increasing: boolean) => void

}

const LargeStatTile = ({ title, headers, items, sort, itemColors, tooltips }: LargeStatTileProps) => {
    const [currentSorting, setCurrentSorting] = useState<string | null>(null);
    const [sortingIncreasing, setSortingIncreasing] = useState<boolean | null>(null)

    return (
        <div className="stat-tile large-stat-tile">
            <h3 className="title">{title}</h3>
            <div className="headers">
                {...headers.map((header, i) => (
                    <div className="header" onClick={() => {
                        let increasing = sortingIncreasing;
                        if (currentSorting != header) {
                            setSortingIncreasing(true)
                            increasing = true
                            setCurrentSorting(header)

                        } else if (sortingIncreasing == null) {
                            setSortingIncreasing(true)
                            increasing = true
                            setCurrentSorting(header)

                        } else if (sortingIncreasing) {
                            setSortingIncreasing(false)
                            increasing = false
                            setCurrentSorting(header)

                        } else {
                            setSortingIncreasing(null)
                            setCurrentSorting(null)
                            increasing = true
                        }

                        sort(header, increasing)
                    }}><div className="tooltip"><label htmlFor="">{header}</label>
                            {tooltips[i] != "" &&
                                <span className="tooltiptext">{tooltips[i]}</span>}
                        </div>

                        <div className="header-sorting">
                            {currentSorting == null || currentSorting != header || sortingIncreasing ?
                                <img src={Up} alt="" /> : <div className="empty"></div>}
                            {currentSorting == null || currentSorting != header || !sortingIncreasing ? <img src={Down} alt="" /> : <div className="empty"></div>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="items">
                {

                    items.map((item) => (<div className="stat"> <h1 className={itemColors[0]}>{item.get(headers[0])}</h1><h1 className={itemColors[1]}>{item.get(headers[1])}</h1><h1 className={itemColors[2]}>{item.get(headers[2])}</h1> </div>))
                }
            </div>

        </div>
    )


}

export default LargeStatTile