import axios from "axios";
import { useState, useEffect } from "react";

const HomeService = (url) => {
  const [listBrainstorming, setListBrainstorming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchListBrainstorming = async () => {
      try {
        const response = await axios.get(url + "/brainstorming");
        setListBrainstorming(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListBrainstorming();
  }, [url]);

  
  return {
    listBrainstorming,
    loading,
    error,
  };
};

export default HomeService;
