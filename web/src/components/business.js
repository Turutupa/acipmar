import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj, phoneNumberBuilder } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineWhatsApp
} from "react-icons/ai";

import styles from "./business.module.css";

const smIcons = {
  twitter: AiFillTwitterCircle,
  facebook: AiFillFacebook,
  instagram: AiFillInstagram,
  whatsapp: AiOutlineWhatsApp
};

function Project(props) {
  const {
    _rawBody,
    title,
    categories,
    mainImage,
    phoneNumber,
    twitter,
    facebook,
    instagram,
    location
  } = props;
  return (
    <article className={styles.root}>
      {props.mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <aside className={styles.metaContent}>
            {/* {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), "MMMM Do YYYY")}
              </div>
            )} */}
            {/* {members && members.length > 0 && <RoleList items={members} title="Project members" />} */}
            {categories && categories.length > 0 && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categorías</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {location && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Dirección</h3>
                <p>{location}</p>
              </div>
            )}
            {phoneNumber && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Información de contacto</h3>
                <p>{phoneNumberBuilder(phoneNumber)}</p>
              </div>
            )}
            {(twitter || facebook || instagram) && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Redes sociales</h3>
                <ul>
                  {[
                    {
                      url: facebook,
                      icon: smIcons.facebook
                    },
                    {
                      url: instagram,
                      icon: smIcons.instagram
                    },
                    {
                      url: twitter,
                      icon: smIcons.twitter
                    }
                  ]
                    .filter(sm => sm.url)
                    .map(sm => {
                      const Icon = sm.icon;
                      const url = sm.url;

                      return (
                        <span className={styles.icon} key={`related_${url}`}>
                          <Link to={`${url}`}>
                            <Icon size={32} />
                          </Link>
                        </span>
                      );
                    })}
                </ul>
              </div>
            )}
            {/* {relatedProjects && relatedProjects.length > 0 && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
                <ul>
                  {relatedProjects.map(project => (
                    <li key={`related_${project._id}`}>
                      {project.slug ? (
                        <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default Project;
