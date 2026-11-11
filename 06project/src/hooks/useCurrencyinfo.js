
import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/rate/${currency}/INR`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error("Error fetching currency:", error));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
