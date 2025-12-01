import PropTypes from "prop-types";

Avatar.propTypes = {
  name: PropTypes.string,
};

export function Avatar({ name ,...rest}) {
  // Função para gerar uma cor aleatória
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Função para extrair as iniciais do nome
  const getInitials = (name) => {
    if (!name) return "";
    const nameArray = name.trim().split(/\s+/);
    if (nameArray.length === 0) return "";
    if (nameArray.length === 1) return nameArray[0][0].toUpperCase();
    return nameArray[0][0].toUpperCase() + nameArray[1][0].toUpperCase();
  };

  const backgroundColor = getRandomColor();
  const initials = getInitials(name);

  const avatarStyle = {
    backgroundColor: "#00686c",
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  return <div {...rest} style={avatarStyle}>{initials}</div>;
}
