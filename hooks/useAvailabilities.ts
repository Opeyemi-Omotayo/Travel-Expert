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
      let path = process.env.NEXT_APP_URL +  `/api/hotel/${slug}/availability`;
      console.log(slug, "slug");
      console.log(process.env.NEXT_APP_URL, "my url");
      console.log(path, "my path");

      const response = await axios.get(
        path,
        {
          params: {
            day,
            time,
            size,
          },
        }
      );
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
