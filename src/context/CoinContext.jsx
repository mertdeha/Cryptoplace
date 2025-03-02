import { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api'



const CoinContext = createContext()

const CoinContextProvider = ({ children }) => {

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    })

    //! Api coin verilerini alan fonksiyon
    const fetchAllCoin = () => {
        api
            .get("/coins/markets", { params: { vs_currency: currency.name } })
            .then((res) => setAllCoin(res.data)
            )
            .catch((err) => { alert("Coin verileri alınırken bir hata oluştu.", err) })
    }

    //! sayfa yüklendiğinde api verilerini alan fonksiyonu bir kereliğine çalıştır
    useEffect(() => {
        fetchAllCoin()
    }, [currency])


    const contextValue = { currency, allCoin, setCurrency }
    return <CoinContext.Provider value={contextValue}>
        {children}
    </CoinContext.Provider>
}

export { CoinContextProvider, CoinContext } 