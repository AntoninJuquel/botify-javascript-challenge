import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Chart from 'react-google-charts'
import DropdownComponent from './DropdownComponent'

export default function ChartComponent({ format, data, chartTypesArray }) {
    const [chartTypeIndex, setChartTypeIndex] = useState(0)
    const [chartTypesDict, setChartTypesDict] = useState({})

    const onSelectChartType = (key) => {
        const chartTypesKey = Object.keys(chartTypesDict)
        setChartTypeIndex(chartTypesKey.indexOf(key))
    }

    useEffect(() => {
        const chartTypesDict = {}
        chartTypesArray.forEach((chartType, i) => {
            chartTypesDict[chartType] = i === chartTypeIndex
        })
        setChartTypesDict(chartTypesDict)
    }, [chartTypesArray,chartTypeIndex])


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
                <DropdownComponent title="Chart type" itemsDict={chartTypesDict} onSelectItem={onSelectChartType} placeholder="Type to search..." />
            </Container>
        </>
    )
}
