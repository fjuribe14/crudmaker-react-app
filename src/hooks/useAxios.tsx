/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActiveRecord } from "@/model/activeRecord";
import axios from "axios";
import { useState, useEffect } from "react";

interface Props {
  model: ActiveRecord;
}

export default function useAxios({ model }: Props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const { endpointRest } = model;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: endpointRest,
          method: model.method,
          params: model.params,
          headers: model.headers,
          data: model.formValues,
        });
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    return () => {
      fetchData();
    };
  }, []);

  return { data, loading, error };
}
