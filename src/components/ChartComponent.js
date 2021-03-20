import React from 'react'
import Chart from 'react-google-charts'

export default function ChartComponent({ data }) {
    return (
        data.length > 0 ?
            <Chart
                width="100%"
                height="100%"
                chartType="BarChart"
                data={[["Neo Name", "Min estimated diameters", "Max estimated diameters"], ...data]}
                options={{
                    title: 'Near Earth Objects',
                    chartArea: { height: '70%', width: '80%',right: 0 },
                    legend: { position: "top" },
                    hAxis: {
                        title: 'Estimated Diameters (km)',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Neo Name',
                    },
                }}
            /> : null
    )
}
