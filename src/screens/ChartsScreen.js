import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { BrowseNeo } from "../api";
import { ChartComponent } from "../components";
import { average, descending } from '../functions';

export default function ChartsScreen() {
    const [data, setData] = useState([])

    const handleResponse = res => {
        const { near_earth_objects } = res

        const neoResult = near_earth_objects.map(neo => [
            neo.name,
            neo.estimated_diameter.kilometers.estimated_diameter_min,
            neo.estimated_diameter.kilometers.estimated_diameter_max,
        ])

        neoResult.sort((a, b) => descending(average(a[1], a[2]),average(b[1], b[2])))

        setData(neoResult)
    }

    useEffect(() => {
        BrowseNeo({})
            .then(handleResponse)
    }, [])
    return (
        <Container style={{ height: "100%" }}>
            <ChartComponent data={data} />
        </Container>
    )
}
