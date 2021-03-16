import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FuzzyPicker from "react-fuzzy-picker";
import styles from "../styles/index.module.css";
import container from "./layout.module.css";
import { navigate } from "gatsby-link";

const animatedComponents = makeAnimated();

export default function Search(props) {
  const { category, selectValues, fuzzyValues } = props;
  return (
    <div>
      {category && <h1>{category}</h1>}

      <div className={styles.inputsWrapper}>
        <div className={styles.selectWrapper}>
          <label className={styles.label}>Categorías</label>
          <Select
            isClearable
            defaultValue={{ value: category, label: category }}
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={selectValues}
            placeholder="Seleccionar categoría"
            onChange={selected => {
              if (!selected || selected.value === "showAll") {
                navigate("/");
              } else {
                navigate(`/category/${selected.label}/`);
              }
            }}
          />
        </div>

        {/* <div className={styles.searchWrapper}>
          <label style={{ fontWeight: "bold" }}>Buscar por nombre</label>

          <FuzzyPicker
            label="Buscar por nombre"
            isOpen={true}
            autoCloseOnEnter
            onChange={choice => {
              try {
                businesses.forEach(business => {
                  if (business.title === choice) {
                    window.location = `/business/${business.slug.current}`;
                  }
                });
              } catch (e) {
                console.error(e);
              }
            }}
            items={fuzzyValues}
            placeholder="Buscar negocio"
          />
        </div> */}
      </div>
    </div>
  );
}
