import { useContext } from "react"
import { LocationContext } from "../contexts/LocationContextProvider"

export const useLocation = () => {
const context = useContext(LocationContext)

if (!context) {
    throw new Error("useLocation must be used within a LocationContextProvider") 
}

return context
}