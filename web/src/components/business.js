import { PDFDownloadLink } from "@react-pdf/renderer";
import { Link, navigate } from "gatsby";
import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillTwitterCircle,
  AiOutlineWhatsApp
} from "react-icons/ai";
import { IoMdReturnLeft } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { buildImageObj, phoneNumberBuilder } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import styles from "./business.module.css";
import Container from "./container";
import DiscountPDF from "./discount-pdf";

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
    location,
    discount
  } = props;

  const [downloadLink, setDownloadLink] = React.useState(null);

  React.useEffect(() => {
    try {
      setDownloadLink(
        <PDFDownloadLink
          document={
            <DiscountPDF
              discount={discount}
              businessName={title}
              location={location}
              phoneNumber={phoneNumber}
            />
          }
          fileName="descuento-acipmar.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Cargando cupón..."
            ) : (
              <div className={styles.buttonWrapper}>
                <button className={styles.discountButton}>¡DESCARGAR DESCUENTO!</button>
              </div>
            )
          }
        </PDFDownloadLink>
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

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
            <button className={styles.returnButton} onClick={() => navigate(-1)}>
              <IoMdReturnLeft /> Volver atrás
            </button>
            {discount && (
              <>
                <div className={styles.discountWrapper}>
                  <h2>Descuento</h2>
                  <p className={styles.discountMsg}>{discount}</p>
                  {downloadLink}
                </div>
              </>
            )}
          </div>
          <aside className={styles.metaContent}>
            {location && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Dirección</h3>
                <Link to={`https://maps.google.com/maps?q=${location}`} target="_blank">
                  <p>
                    {icon(MdLocationOn)}
                    {location}
                  </p>
                </Link>
              </div>
            )}
            {phoneNumber && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Información de contacto</h3>
                <Link href={`tel:${phoneNumber}`}>
                  <p>
                    {icon(AiFillPhone)}
                    {phoneNumberBuilder(phoneNumber)}
                  </p>
                </Link>
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
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default Project;

function icon(Icon) {
  return <Icon size={20} style={{ marginRight: "10px" }} />;
}
