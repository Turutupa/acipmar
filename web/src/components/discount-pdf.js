import React from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font
} from "@react-pdf/renderer";
import Logo from "../images/acipmar-logo.png";
import MontserratLight from "../fonts/Montserrat/Montserrat-Light.ttf";
import MontserratMedium from "../fonts/Montserrat/Montserrat-Medium.ttf";
import MontserratBold from "../fonts/Montserrat/Montserrat-Bold.ttf";

// Register font
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: MontserratLight,
      fontWeight: 200,
      format: "truetype"
    },
    {
      src: MontserratMedium,
      fontWeight: 500,
      fontStyle: "normal",
      format: "truetype"
    },
    {
      src: MontserratBold,
      fontWeight: 700,
      fontStyle: "normal",
      format: "truetype"
    }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    textAlign: "center"
  },
  image: {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60
  },
  section: {
    marginTop: 40
  },
  header: {
    boxShadow: "2px solid black",
    fontFamily: "Montserrat",
    fontWeight: 700
  },
  subheader: {
    fontFamily: "Montserrat",
    fontSize: 12
  },
  body: {
    backgroundColor: "black",
    color: "white",
    padding: 50,
    marginTop: 50
  },
  businessName: {
    fontSize: 22,
    fontFamily: "Montserrat",
    fontWeight: "bold"
  },
  location: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "thin"
  },
  phoneNumber: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "thin"
  },
  discount: {
    marginTop: 50,
    fontFamily: "Montserrat",
    fontWeight: 500
  },
  footer: {
    marginTop: 220
  },
  footerText: {
    fontFamily: "Montserrat",
    fontWeight: 200,
    fontSize: 12
  }
});

// Create Document Component
const DiscountPDF = props => {
  try {
    const { businessName, location, phoneNumber, discount } = props;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Image src={Logo} source={Logo} style={styles.image} />

          <View style={styles.body}>
            <Text style={styles.businessName}>{businessName}</Text>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.phoneNumber}>Teléfono: {phoneNumber}</Text>
            <Text style={styles.discount}>{discount.toUpperCase()}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>BONO FÍSICO</Text>
            <Text style={styles.subheader}>
              Presenta el bono en el establecimiento para aplicar el descuento
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Válido para un único uso</Text>
          </View>
        </Page>
      </Document>
    );
  } catch (e) {
    return <div>Oops! Something went wrong!</div>;
  }
};

export default DiscountPDF;
