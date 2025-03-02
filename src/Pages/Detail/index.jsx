import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../utils/api"
import { CoinContext } from "../../context/CoinContext"
import LineChart from "../../Components/LineChart"


const Detail = () => {

    // url deki id ye eriş
    const { coinId } = useParams()

    const { currency } = useContext(CoinContext)

    // states
    const [coinData, setCoinData] = useState(null)
    const [historicalData, setHistoricalData] = useState(null)

    // coin detaylarını getiren fonksiyon
    const fetchCoinDetail = () => {
        api.get(`/coins/${coinId}`)
            .then((res) => setCoinData(res))
            .catch((err) => alert("Üzgünüz, bir hata oluştu:", err))
    }

    const fetchCoinHistoricalData = () => {
        api.get(`/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: currency.name,
                days: 14,
            }
        })
            .then((res) => setHistoricalData(res.data))
            .catch((err) => console.log(err))
    }


    useEffect(() => {
        fetchCoinDetail();
        fetchCoinHistoricalData();
    }, [coinId, currency])

    console.log(coinData);

    return (
        <div className="bg-[#0D0E2B] px-5 min-h-screen">

            {/* Image */}
            <div className="flex flex-col items-center gap-5 my-20 mb-12 mx-auto">
                <img
                    src={coinData?.data.image.large}
                    alt="coin-image"
                    className="max-w-[120px] mt-4 drop-shadow-lg"
                />
                <p>
                    {coinData?.data.name}
                    ({coinData?.data.symbol.toUpperCase()})
                </p>
            </div>

            {/* Chart */}
            <div className="max-w-[700px] mx-auto h-[300px]">
                <LineChart historicalData={historicalData} />
            </div>
            {/* Info area */}
            <div className="max-w-[700px] mx-auto my-12 flex flex-col bg-[#121236] p-6 rounded-lg shadow-md">
                {[
                    { label: "Piyasa Sıralaması", value: coinData?.data.market_cap_rank },
                    {
                        label: "Güncel Fiyat",
                        value: `${currency.symbol}${coinData?.data.market_data.current_price[
                            currency.name
                        ].toLocaleString()}`,
                    },
                    {
                        label: "Piyasa Değeri",
                        value: `${currency.symbol}${coinData?.data.market_data.market_cap[
                            currency.name
                        ].toLocaleString()}`,
                    },
                    {
                        label: "24 Saatlik En Yüksek",
                        value: `${currency.symbol}${coinData?.data.market_data.high_24h[
                            currency.name
                        ].toLocaleString()}`,
                    },
                    {
                        label: "24 Saatlik En Düşük",
                        value: `${currency.symbol}${coinData?.data.market_data.low_24h[
                            currency.name
                        ].toLocaleString()}`,
                    },
                ].map((item, key) => (
                    <ul key={key} className="flex justify-between py-3 mx-1 border-b border-[#5f5d5f]">
                        <li className="font-semibold text-[#ffcc00]">{item.label}</li>
                        <li className="font-light">{item.value}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default Detail