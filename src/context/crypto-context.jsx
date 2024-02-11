import { createContext, useEffect, useState, useContext } from "react";
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from "../utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({children}) {
    // State hooks for cryptoData, assets and loading.

    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    
    // Fake Function that immitates a call to the server.

    useEffect(() => {
        async function preload() {
            setLoading(true)
           const { result } = await fakeFetchCrypto()
          const assets = await fetchAssets()
          

          setAssets(assets.map( asset => {
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price, 
                ...asset,
            }
          }))
          setCrypto(result)
          setLoading(false)
        }
        preload()
    }, [])
    return <CryptoContext.Provider value={{loading, crypto, assets}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}