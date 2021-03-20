import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import { BrowseNeo } from "../api";
import { ChartComponent } from "../components";
import { average, descending } from '../functions';

export default function ChartsScreen() {
    const [data, setData] = useState({ links: { next: null, prev: null, curr: null }, neo: [] })

    const fetchNeo = (url) => {
        setData({ ...data, neo: [] })
        BrowseNeo({ url }).then(handleResponse)
    }

    const handleResponse = res => {
        const { near_earth_objects, links } = res

        const neoResult = near_earth_objects.map(neo => [
            neo.name,
            neo.estimated_diameter.kilometers.estimated_diameter_min,
            neo.estimated_diameter.kilometers.estimated_diameter_max,
        ])

        neoResult.sort((a, b) => descending(average(a[1], a[2]), average(b[1], b[2])))

        setData({ links, neo: neoResult })
    }

    useEffect(() => {
        BrowseNeo({}).then(handleResponse)
    }, [])
    return (
        <Container style={{ height: "100%" }}>
            <ChartComponent data={data.neo} />
            <Container style={{ position: 'absolute', bottom: 0 }}>
                <Button disabled={!data.links.prev} onClick={() => fetchNeo(data.links.prev)}>{"<"}</Button>
                <Button disabled={!data.links.next} onClick={() => fetchNeo(data.links.next)}>{">"}</Button>
            </Container>
        </Container>
    )
}
