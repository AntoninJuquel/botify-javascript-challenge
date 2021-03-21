import React, { useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import Chart from 'react-google-charts'

export default function ChartComponent({ format, data, chartTypesArray }) {
    const [chartTypeIndex, setChartTypeIndex] = useState(0)
    return (
        <>
            {data.length > 0 ?
                <Chart
                    width="100%"
                    height="100%"
                    chartType={chartTypesArray[chartTypeIndex]}
                    data={[format, ...data]}
                    options={{
                        title: 'Near Earth Objects',
                        chartArea: { height: '70%', width: '80%', right: 0 },
                        legend: { position: "top" },
                        hAxis: {
                            title: 'Estimated Diameters (km)',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Neo Name',
                        },
                    }}
                /> :
                <Spinner style={{ position: 'absolute', top: '50%' }} variant="primary" animation="border" />}
            <Container style={{ position: 'absolute', top: 0, left: 0 }}>
                {chartTypesArray.map((chartType, i) => <Button key={i} onClick={() => setChartTypeIndex(i)}>{chartType}</Button>)}
            </Container>
        </>
    )
}
