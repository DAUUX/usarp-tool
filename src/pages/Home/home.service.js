import axios from "axios";
import { useState, useEffect } from "react";

const HomeService = (url) => {
  const [listBrainstorming, setListBrainstorming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = "/brainstorming/countAllBrainstormings";

  useEffect(() => {
    const getProjectName = async (brainstorming) => {
      await Promise.all(
        brainstorming.map(async (item) => {
          const projectName = item.project;
          const response = await axios.get(
            url + `/projects-details?id=${projectName}`
          );
          item.projectName = response.data.projects[0].projectName;
        })
      );
      return brainstorming;
    };

    const fetchListBrainstorming = async () => {
      try {
        const response = await axios.get(url + router);
        const firstFourItems = response.data.getAllBrainstormingsAndCount.rows.slice(0, 4);
        const listBrainstorming = await getProjectName(firstFourItems);
        setListBrainstorming(listBrainstorming);
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
