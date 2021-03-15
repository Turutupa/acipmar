import React from "react";
import Header from "./header";

import "../styles/layout.css";
import styles from "./layout.module.css";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, clearFilters }) => (
  <>
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      clearFilters={clearFilters}
    />
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          {new Date().getFullYear()} © ACIPMAR. Aviso Legal. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
