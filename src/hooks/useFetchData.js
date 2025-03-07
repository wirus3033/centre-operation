// frontend/src/hooks/useFetchData.js
import { useState, useEffect, useCallback } from "react";

const useFetchData = () => {
    const [data, setData] = useState([]);
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [fokontany, setFokontany] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const cachedData = localStorage.getItem("cachedData");
            if (cachedData) {
                const { populationData, fokontanyData, regionsData, districtsData, communesData } = JSON.parse(cachedData);
                setData(populationData || []);
                setRegions(regionsData || []);
                setDistricts(districtsData || []);
                setCommunes(communesData || []);
                setFokontany(fokontanyData || []);
                setLoading(false);
                return;
            }

            const [popRes, fokRes, regRes, distRes, comRes] = await Promise.all([
                fetch("http://localhost:4000/api/population"),
                fetch("http://localhost:4000/api/fokontany"),
                fetch("http://localhost:4000/api/region"),
                fetch("http://localhost:4000/api/district"),
                fetch("http://localhost:4000/api/commune"),
            ]);

            if (!popRes.ok || !fokRes.ok || !regRes.ok || !distRes.ok || !comRes.ok) {
                throw new Error("Échec du chargement des données");
            }

            const [populationData, fokontanyData, regionsData, districtsData, communesData] = await Promise.all([
                popRes.json(),
                fokRes.json(),
                regRes.json(),
                distRes.json(),
                comRes.json(),
            ]);

            localStorage.setItem("cachedData", JSON.stringify({ populationData, fokontanyData, regionsData, districtsData, communesData }));

            setData(populationData || []);
            setRegions(regionsData || []);
            setDistricts(districtsData || []);
            setCommunes(communesData || []);
            setFokontany(fokontanyData || []);
        } catch (error) {
            console.error("❌ Erreur lors du chargement des données :", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, regions, districts, communes, fokontany, loading, setData };
};

export default useFetchData;
