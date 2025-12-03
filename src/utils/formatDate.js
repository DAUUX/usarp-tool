/**
 * Formata a data em dd/MM/yyyy
 */
function formatDateToDDMMYYYY(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  // Usa métodos UTC para evitar conversão de fuso horário
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export { formatDateToDDMMYYYY};