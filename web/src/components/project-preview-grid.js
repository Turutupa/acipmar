import { Link } from "gatsby";
import React from "react";
import ProjectPreview from "./project-preview";

import styles from "./project-preview-grid.module.css";

function ProjectPreviewGrid(props) {
  const numberOfPreviewedItems = 3;
  const showAll = props.currentCategory && props.currentCategory.label === props.title;

  return (
    <div className={styles.root}>
      {props.title && <h1 className={styles.headline}>{props.title}</h1>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.slice(0, showAll ? props.nodes.length : numberOfPreviewedItems).map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
            </li>
          ))}
        {props.nodes.length > numberOfPreviewedItems && props.title && !props.currentCategory && (
          <span
            className={styles.browseMoreNav}
            onClick={() => {
              try {
                props.browseMoreHref();
                window.scrollTo(0, 0);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Ver todos <br />
            {props.title}
          </span>
        )}
      </ul>
    </div>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: ""
};

export default ProjectPreviewGrid;
