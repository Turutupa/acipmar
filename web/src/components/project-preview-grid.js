import { Link } from "gatsby";
import React from "react";
import ProjectPreview from "./project-preview";

import styles from "./project-preview-grid.module.css";

function ProjectPreviewGrid(props) {
  const numberOfPreviewedItems = 5;

  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.slice(0, numberOfPreviewedItems).map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
            </li>
          ))}
        {props.nodes.length > numberOfPreviewedItems && props.title && (
          <Link className={styles.browseMoreNav} to={props.browseMoreHref}>
            Ver más {props.title}
          </Link>
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
