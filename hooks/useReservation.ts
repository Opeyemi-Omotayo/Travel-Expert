import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    size,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerRequest,
    setDidBook,
  }: {
    slug: string;
    size: string;
    day: string;
    time: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerRequest: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.NEXT_APP_URL + `/api/hotel/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            size,
          },
        }
      );

      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, createReservation };
}