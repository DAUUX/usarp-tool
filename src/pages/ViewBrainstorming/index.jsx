import { useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ViewSwitcher } from "../../components/ViewSwitcher";
import { Pagination } from "../../components/Pagination";
import ViewBrainstormingService from "./viewBrainstorming.service.js";
import styles from "./styles.module.scss";

export function ViewBrainstorming() {
  const {
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
  } = ViewBrainstormingService();

  const paginationSize = [5, 10, 25, 50];
  const [limit, setLimit] = useState(pagination.pagination.limit);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pagination.count / limit) || 1;

  const handleSortChange = (sortKey) => {
    setActiveSort(sortKey);
  };

  const handleCardClick = (id) => {
    console.log(`Card clicado: ${id}`);
  };

  const handleFavorite = (id) => {
    toggleItemFavorite(id);
  };

  const handleEdit = (id) => {
    console.log(`Editar item: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deletar item: ${id}`);
  };

  const handleLimitChange = (updateLimit) => {
    setLimit(updateLimit);
    setCurrentPage(1);
    setPagination((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, offset: 0, limit: updateLimit },
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPagination((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, offset: (page - 1) * limit },
    }));
  };

  if (loading) {
    return (
      <div className={styles.viewBrainstorming__container}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.viewBrainstorming__container}>
        <p>Ocorreu um erro: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.viewBrainstorming__container}>
      <header>
        <span title="voltar">
          <h4>Brainstorming</h4>
        </span>
        <Input.Root
          style={{ width: "30%" }}
          placeholder="Pesquisar brainstorming"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className={styles.viewBrainstorming__content}>
        <div className={styles.viewBrainstorming__box_top}>
          <div className={styles.viewBrainstorming__filter}>
            <Dropdown.Root default={true}>
              <Dropdown.Trigger title="Todos" />
            </Dropdown.Root>
            <Dropdown.Root>
              <Dropdown.Trigger title="Recentes" />
              <Dropdown.Menu>
                <Dropdown.Item value="Vistos recentemente">Vistos recentemente</Dropdown.Item>
                <Dropdown.Item value="Não vistos nos últimos 30 dias">Não vistos nos últimos 30 dias</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
            <Dropdown.Root onSelect={handleSortChange}>
              <Dropdown.Trigger title="Favoritos" />
              <Dropdown.Menu>
                <Dropdown.Item value="fav_alpha_az">Ordem alfabética (A-Z)</Dropdown.Item>
                <Dropdown.Item value="fav_alpha_za">Ordem alfabética (Z-A)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
            <Dropdown.Root onSelect={handleSortChange}>
              <Dropdown.Trigger title="Data de criação" />
              <Dropdown.Menu>
                <Dropdown.Item value="date_newest">Criados recentemente</Dropdown.Item>
                <Dropdown.Item value="date_oldest">Mais antigos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
          </div>
          <ViewSwitcher
            currentView={viewMode}
            showListView={showListView}
            showCardView={showCardView}
          />
        </div>

        {viewMode === 'list' && (
          <div className={styles.viewBrainstorming__table}>
            <table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CRIADO POR</th>
                  <th>DATA DE CRIAÇÃO</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {brainstormingList.length <= 0 ? (
                  <tr>
                    <td>Ainda não há brainstormings cadastrados. Criar meu primeiro brainstorming agora.</td>
                  </tr>
                ) : (
                  brainstormingList.map((item) => {
                    const starIcon = item.favorited ? 'starCompleta' : 'star';
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <div className={styles.table__users}>
                            <IconChoice icon={item.userIcon} />
                            <span>{item.createdBy}</span>
                          </div>
                        </td>
                        <td>
                          <span>{item.creationDate}</span>
                        </td>
                        <td>
                          <div className={styles.table__status}>
                            <span>{item.status}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.table__buttons}>
                            <span title="Favoritar" onClick={() => handleFavorite(item.id)}>
                              <IconChoice icon={starIcon} />
                            </span>
                            <span title="Editar" onClick={() => handleEdit(item.id)}>
                              <IconChoice icon="edit" />
                            </span>
                            <span title="Deletar" onClick={() => handleEdit(item.id)}>
                              <IconChoice icon="delete" />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === 'card' && (
          <div className={styles.viewBrainstorming__card}>
            {brainstormingList.length > 0 ? (
              <div className={styles.viewBrainstorming__cardGrid}>
                {brainstormingList.map((brainstorming) => {
                  const starIcon = brainstorming.favorited ? 'starCompleta' : 'star';
                  return (
                    <BrainstormingCard
                      key={brainstorming.id}
                      brainstormingName={brainstorming.name}
                      projectName={`Projeto de ${brainstorming.createdBy}`}
                      date={brainstorming.creationDate}
                      hour={brainstorming.hour}
                      userStory={brainstorming.userStory}
                      onClick={() => handleCardClick(brainstorming.id)}
                      actions={
                        <div className={styles.brainstormingcard__actions}>
                          <span title="Favoritar" onClick={(e) => { e.stopPropagation(); handleFavorite(brainstorming.id); }}>
                            <IconChoice icon={starIcon} />
                          </span>
                          <span title="Editar" onClick={(e) => { e.stopPropagation(); handleEdit(brainstorming.id); }}>
                            <IconChoice icon="edit" />
                          </span>
                          <span title="Deletar" onClick={(e) => { e.stopPropagation(); handleEdit(brainstorming.id); }}>
                            <IconChoice icon="delete" />
                          </span>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', width: '100%', color: '#00686c' }}>
                Ainda não há brainstormings cadastrados. Criar meu primeiro brainstorming agora.
              </div>
            )}
          </div>
        )}

        {brainstormingList.length > 0 && (
          <Pagination.Root>
            <Pagination.Selector
              currentLimit={limit}
              onLimitChange={handleLimitChange}
              limitOptions={paginationSize}
            />
            <Pagination.Numbers
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Pagination.Root>
        )}
      </div>
    </div>
  );
}