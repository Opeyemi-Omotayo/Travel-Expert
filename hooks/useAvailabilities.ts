import { useState } from "react";
import axios from "axios";

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    size,
    day,
    time,
  }: {
    slug: string;
    size: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        process.env.NEXT_APP_URL +  `/hotel/${slug}/availability`,
        {
          params: {
            day,
            time,
            size,
          },
        }
      );
      console.log(response);
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, data, error, fetchAvailabilities };
};

export default useAvailabilities;
