import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { CSVLink } from 'react-csv';

import { BrowseNeo } from "../api";
import { ChartComponent, DropdownComponent } from "../components";
import { average, closestDate, descending } from "../functions";

export default function ChartsScreen() {
    const [data, setData] = useState(
        {
            links: { next: null, prev: null, curr: null },
            format: ["Neo Name", "Min estimated diameters", "Max estimated diameters"],
            neo: []
        }
    )

    const [filters, setFilter] = useState({
        "Earth": false,
        "Mars": false,
        "Merc": false,
        "Juptr": false
    })

    const selectFilter = (filter) => {
        const newFilters = { ...filters }
        newFilters[filter] = !newFilters[filter]
        setFilter(newFilters)
    }

    const fetchNeo = (url) => {
        setData({ ...data, neo: [] })
        BrowseNeo({ url }).then(handleResponse)
    }

    const handleResponse = res => {
        const { near_earth_objects, links } = res

        const activesFilters = Object.keys(filters).filter(key => filters[key])

        // Select neo with most recent corresponding orbiting body
        const filteredNeo = near_earth_objects.filter(neo => {
            const date = closestDate(neo.close_approach_data.map(neoData => new Date(neoData.close_approach_date)))
            return activesFilters.includes(neo.close_approach_data[date.index].orbiting_body) || activesFilters.length === 0
        })

        // Browse pages until you find result
        if (filteredNeo.length === 0 && links.next) {
            fetchNeo(links.next)
            return
        }
        const neoResult = filteredNeo.map(neo => [
            neo.name,
            neo.estimated_diameter.kilometers.estimated_diameter_min,
            neo.estimated_diameter.kilometers.estimated_diameter_max,
        ])

        neoResult.sort((a, b) => descending(average(a[1], a[2]), average(b[1], b[2])))

        setData({ ...data, links, neo: neoResult })
    }

    useEffect(() => {
        BrowseNeo({}).then(handleResponse)
    }, [filters])

    return (
        <Container style={{ height: "100%" }}>
            <Container style={{ position: 'absolute', right: 0, zIndex: 100 }}>
                <DropdownComponent title="Orbiting body" itemsDict={filters} placeholder="Type to search..." onSelectItem={selectFilter} />
            </Container>
            <Container style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 100 }}>
                <Button disabled={!data.links.prev} onClick={() => fetchNeo(data.links.prev)}>{"<"}</Button>
                <Button disabled={!data.links.next} onClick={() => fetchNeo(data.links.next)}>{">"}</Button>
            </Container>
            <Container style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 100 }}>
                <CSVLink className="btn btn-primary" data={[data.format, ...data.neo]}>Download me</CSVLink>
            </Container>
            <ChartComponent format={data.format} data={data.neo} chartTypesArray={["BarChart", "Table"]} />
        </Container>
    )
}
