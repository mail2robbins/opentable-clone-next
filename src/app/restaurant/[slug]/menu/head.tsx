import React from "react";

const Head = () => {
  return (
    <>
      <title>Menu: Open Table</title>
      <meta name="description" content="A brief description of your page" />
      <meta name="keywords" content="keyword1, keyword2, keyword3" />
      <meta name="author" content="Robin Thomas" />

      {/* Open Graph tags */}
      {/* <meta property="og:title" content="Your Page Title" />
      <meta
        property="og:description"
        content="A brief description of your page"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.yourwebsite.com" />
      <meta
        property="og:image"
        content="https://www.yourwebsite.com/og-image.jpg"
      />
      <meta
        property="og:image:alt"
        content="Alt text for your Open Graph image"
      /> */}

      {/* Twitter Card tags */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Your Page Title" />
      <meta
        name="twitter:description"
        content="A brief description of your page"
      />
      <meta
        name="twitter:image"
        content="https://www.yourwebsite.com/twitter-card-image.jpg"
      /> */}

      {/* Other meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default Head;
