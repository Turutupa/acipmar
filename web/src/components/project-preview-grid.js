import { Link } from "gatsby";
import React from "react";
import ProjectPreview from "./project-preview";

import styles from "./project-preview-grid.module.css";

function ProjectPreviewGrid(props) {
  const { showAll } = props;
  const numberOfPreviewedItems = 3;

  return (
    <div className={styles.root}>
      {!showAll && props.title && <h1 className={styles.headline}>{props.title}</h1>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.slice(0, showAll ? props.nodes.length : numberOfPreviewedItems).map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
            </li>
          ))}
        {props.nodes.length > 0 && !showAll && (
          <span
            className={styles.browseMoreNav}
            onClick={() => {
              try {
                props.browseMoreHref();
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
