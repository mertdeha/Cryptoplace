import { useEffect, useState } from "react"
import Chart from "react-google-charts"

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]])

    useEffect(() => {

        // Api dan gelen veriyi googlw chart ın istediği formata çevirdik. Chart bizden grafik çizimi için 2 değer istiyor. Bunu da biz ilgili datayı dönüp elde ettik
        if (historicalData?.prices) {
            const dataCopy = [["Date", "Prices"],
            ...historicalData?.prices.map((item) => [
                new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]
            ])]

            setData(dataCopy)
        }
    }, [historicalData])
    return <Chart chartType="LineChart" data={data} height="100%" />
}

export default LineChart