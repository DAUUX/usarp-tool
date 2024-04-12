import styles from './styles.module.scss';
import ToggleMenuOption from '../ToggleMenuOption';
import React, { useState, useRef, useEffect } from 'react';

export default function ToggleMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if(divRef.current
          && !divRef.current.contains(event.target)
          && !event.target.closest("#" + styles.AccountMenu)) {
        setShowMenu(prevState => !prevState)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div id={styles.AccountMenu} onClick={() => setShowMenu(prevState => !prevState)}>
        <img
          src="../../src/assets/images/userPlaceholder.png"
          alt="Foto do usuário"
          width="28"
          height="28"
        />
        <span>
          Nome usuário
        </span>
        <img
          className={styles.ArrowIcon}
          src={
            showMenu ?
            "../../src/assets/icons/arrowUp.svg" :
            "../../src/assets/icons/arrow.svg"
          }
          alt="Mostrar mais"
          width="20"
          height="20"
        />
        {showMenu && (
          <div id={styles.DropDown} ref={divRef}>
            <ul>
              <ToggleMenuOption
                src="../../src/assets/icons/profile_icon.svg"
                alt="Ícone de perfil do usário"
                link="perfil"
                text="Meu perfil"
              />
              <ToggleMenuOption
                src="../../src/assets/icons/logout.svg"
                alt="Ícone de logout"
                link="/"
                text="Sair"
              />
            </ul>
          </div>
        )}
      </div>
  );
}