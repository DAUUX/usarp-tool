import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AccordionContext } from "./AccordionRoot";

export function AccordionItem({ children, index }) {
  const { activeIndex } = useContext(AccordionContext);
  const isOpen = activeIndex === index;
  return (
    <div className={styles.accordion_item + ` ${isOpen ? styles.active : ""}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index });
        }
      })}
    </div>
  );
}
