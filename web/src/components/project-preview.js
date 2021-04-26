import { Link } from "gatsby";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import styles from "./project-preview.module.css";
import { responsiveTitle3 } from "./typography.module.css";

function ProjectPreview(props) {
  return (
    <Link className={styles.root} to={`/business/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props.excerpt && (
        <div className={styles.excerpt}>
          <p>{props.excerpt}</p>
        </div>
      )}
      <p className={styles.discount}>{props.discount}</p>
    </Link>
  );
}

export default ProjectPreview;
