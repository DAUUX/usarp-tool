import { useState, useEffect } from "react";

const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('/');
  return new Date(year, month - 1, day);
};

const ViewBrainstormingService = () => {
  const [originalList, setOriginalList] = useState([]);
  const [brainstormingList, setBrainstormingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('card');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    pagination: {
      offset: 0,
      limit: 5,
    },
  });

  const showListView = () => setViewMode('list');
  const showCardView = () => setViewMode('card');

  const toggleItemFavorite = (itemId) => {
    const updatedList = originalList.map(item =>
      item.id === itemId ? { ...item, favorited: !item.favorited } : item
    );
    setOriginalList(updatedList);
  };

  useEffect(() => {
    const fetchBrainstormingData = () => {
      try {
        const mockData = [
          {
            id: 1,
            name: "Brainstorming para Novo App de Fitness",
            createdBy: "Ana Silva",
            userIcon: "user",
            creationDate: "25/07/2024",
            status: "Em andamento",
            hour: "14:30",
            userStory: "4, 5, 6",
            favorited: false,
          },
          {
            id: 2,
            name: "Ideias para Campanha de Marketing Q3",
            createdBy: "Carlos Oliveira",
            userIcon: "user",
            creationDate: "15/06/2024",
            status: "Concluído",
            hour: "10:00",
            userStory: "9, 10 ",
            favorited: true,
          },
          {
            id: 3,
            name: "Melhorias na Interface do Usuário",
            createdBy: "Beatriz Costa",
            userIcon: "user",
            creationDate: "02/08/2024",
            status: "Planejado",
            hour: "09:00",
            userStory: "6, 7",
            favorited: false,
          },
          {
            id: 4,
            name: "Novo Brainstorming Favorito 1",
            createdBy: "Novo Usuário 1",
            userIcon: "user",
            creationDate: "05/08/2024",
            status: "Em andamento",
            hour: "11:00",
            userStory: "1, 2, 3",
            favorited: true,
          },
          {
            id: 5,
            name: "Novo Brainstorming Favorito 2",
            createdBy: "Novo Usuário 2",
            userIcon: "user",
            creationDate: "06/08/2024",
            status: "Planejado",
            hour: "16:00",
            userStory: "8, 11, 12",
            favorited: true,
          },
        ];

        setTimeout(() => {
          setOriginalList(mockData);
          setPagination(prev => ({ ...prev, count: mockData.length }));
          setLoading(false);
        }, 500);

      } catch (err) {
        setError("Ocorreu um erro ao buscar os dados de brainstorming.");
        setLoading(false);
      }
    };

    fetchBrainstormingData();
  }, []);

  useEffect(() => {
    let processedList = [...originalList];

    if (activeSort?.startsWith('fav_')) {
      processedList = processedList.filter(item => item.favorited);
    }

    if (searchTerm) {
      processedList = processedList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeSort) {
      switch (activeSort) {
        case 'fav_alpha_az':
          processedList.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'fav_alpha_za':
          processedList.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'date_newest':
          processedList.sort((a, b) => parseDate(b.creationDate) - parseDate(a.creationDate));
          break;
        case 'date_oldest':
          processedList.sort((a, b) => parseDate(a.creationDate) - parseDate(b.creationDate));
          break;
        default:
          break;
      }
    }

    const count = processedList.length;
    const { offset, limit } = pagination.pagination;
    setBrainstormingList(processedList.slice(offset, offset + limit));
    setPagination(prev => ({ ...prev, count }));

  }, [searchTerm, activeSort, originalList, pagination.pagination]);

  return {
    brainstormingList,
    loading,
    error,
    viewMode,
    showListView,
    showCardView,
    searchTerm,
    setSearchTerm,
    setActiveSort,
    pagination,
    setPagination,
    toggleItemFavorite,
  };
};

export default ViewBrainstormingService;