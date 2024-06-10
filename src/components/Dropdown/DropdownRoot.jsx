import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

// export function DropdownRoot({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSelect = (value) => {
//     setSelectedValue(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className={styles.dropdown}>
//       {React.Children.map(children, (child) =>
//         React.isValidElement(child)
//           ? React.cloneElement(child, {
//               isOpen,
//               toggleDropdown,
//               handleSelect,
//               selectedValue,
//             })
//           : child
//       )}
//     </div>
//   );
// }

// DropdownRoot.propTypes = {
//   children: PropTypes.node.isRequired,
// };
