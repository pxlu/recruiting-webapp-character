import { useState, useCallback } from "react";

const useCharacterApi = (apiUrl, method = "GET") => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data = null) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetch(apiUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          ...(data && { body: JSON.stringify(data) }),
        });

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }

        const jsonResponse = await result.json();
        setResponse(jsonResponse);
      } catch (err) {
        console.error("Error during API request:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, method]
  );

  return { response, loading, error, sendRequest };
};

export default useCharacterApi;
