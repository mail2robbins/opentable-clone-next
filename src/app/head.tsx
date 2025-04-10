import React from "react";

const Head = () => {
  return (
    <>
      <title>OpenTable | Find and Book the Best Restaurants</title>
      <meta name="description" content="Discover and book the perfect restaurant for any occasion. Browse reviews, menus, and availability for thousands of restaurants." />
      <meta name="keywords" content="restaurants, dining, reservations, food, booking, restaurant reviews, open table, restaurant finder" />
      <meta name="author" content="Robin Thomas" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="Next.js" />

      {/* Open Graph tags */}
      <meta property="og:title" content="OpenTable | Find and Book the Best Restaurants" />
      <meta property="og:description" content="Discover and book the perfect restaurant for any occasion. Browse reviews, menus, and availability for thousands of restaurants." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://opentable-clone.vercel.app" />
      <meta property="og:image" content="https://opentable-clone.vercel.app/og-image.jpg" />
      <meta property="og:image:alt" content="OpenTable - Restaurant booking platform" />
      <meta property="og:site_name" content="OpenTable" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="OpenTable | Find and Book the Best Restaurants" />
      <meta name="twitter:description" content="Discover and book the perfect restaurant for any occasion. Browse reviews, menus, and availability for thousands of restaurants." />
      <meta name="twitter:image" content="https://opentable-clone.vercel.app/twitter-card-image.jpg" />
      <meta name="twitter:creator" content="@robinthomas" />

      {/* Responsive meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#0f1f47" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />

      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f1f47" />
      <meta name="msapplication-TileColor" content="#0f1f47" />
    </>
  );
};

export default Head;
