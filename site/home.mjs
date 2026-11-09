import { magazineFeature, profileLinks } from "./profiles.mjs";

const localGuides = [
  ["royal-oak", "Royal Oak", "Oakland County"],
  ["troy", "Troy", "Oakland County"],
  ["rochester-hills", "Rochester Hills", "Oakland County"],
  ["shelby-township", "Shelby Township", "Macomb County"],
  ["sterling-heights", "Sterling Heights", "Macomb County"],
  ["washington-twp", "Washington Township", "Macomb County"],
];

export const homeBody = `
<section class="personal-hero">
  <img class="personal-hero-background" src="/assets/architecture.webp" width="1280" height="720" alt="">
  <div class="site-shell twelve-grid personal-hero-grid">
    <figure class="personal-hero-portrait">
      <img src="/assets/susie.webp" width="720" height="1080" fetchpriority="high" alt="Susie Sharak, real estate agent with Golden Realty">
      <figcaption>Susie Sharak <span>Golden Realty</span></figcaption>
    </figure>
    <div class="personal-hero-copy">
      <p class="eyebrow">Oakland & Macomb County, Michigan</p>
      <h1>Buying or selling?<br>Let’s make it easier.</h1>
      <p>Hi, I’m Susie Sharak, a local Realtor helping you buy or sell in Oakland and Macomb County, Michigan.</p>
      <div class="hero-actions">
        <a class="button button-light" href="/home-value#valuation-form">Get my home value</a>
        <a class="hero-call" href="#contact-form">Message Susie <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>

${profileLinks()}

<section class="personal-introduction site-shell twelve-grid">
  <div class="introduction-title"><h2>You don’t have to<br>figure it out alone.</h2></div>
  <div class="introduction-copy"><p>Buying or selling a home is personal. You deserve someone who listens, explains what’s happening and looks out for you from the first showing to closing.</p><p>I work with buyers and sellers across Oakland and Macomb County, from first homes to the next chapter. My clients’ kind words mean a lot to me. You’ll find some of them below.</p><a class="text-link" href="/about">A little more about me <span aria-hidden="true">↗</span></a></div>
</section>

<section class="home-services site-shell">
  <div class="section-heading"><h2>What can I help you with?</h2></div>
  <div class="twelve-grid service-grid">
    <article class="service-card">
      <a href="/buy#buyer-form" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/living.webp" width="1200" height="801" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Buying</p><h3>Let’s find your home.</h3><p>Your first place? More room? Something closer to family? Tell me what matters most, and we’ll go from there.</p><a class="text-link" href="/buy#buyer-form">Tell me what you’re looking for <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="service-card">
      <a href="/sell#seller-form" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/kitchen.webp" width="1200" height="675" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Selling</p><h3>Thinking about selling?</h3><p>Let’s look at your home, your timing and what’s selling nearby before you spend money getting ready.</p><a class="text-link" href="/sell#seller-form">Tell me about your plans <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="service-card">
      <a href="/home-value#valuation-form" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/estate.webp" width="1200" height="798" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Home value</p><h3>What could yours sell for?</h3><p>Send me your address and a few details. I’ll take a look at nearby sales and what makes your home different.</p><a class="text-link" href="/home-value#valuation-form">Let’s look at your home’s value <span aria-hidden="true">↗</span></a></div>
    </article>
  </div>
  <p class="photography-note">Home photography is illustrative, not an available listing.</p>
</section>

${magazineFeature()}

<section class="local-market-band">
  <div class="site-shell twelve-grid local-market-grid">
    <div class="local-market-copy"><p class="eyebrow">September 2026 market update</p><h2>So, how’s the market?</h2><p>There were more homes to choose from than a year earlier. Let’s look at the numbers, then talk about what they mean for your plans.</p><a class="text-link" href="/market-update">See the local numbers <span aria-hidden="true">↗</span></a></div>
    <div class="local-market-stat"><p>Oakland County</p><strong>$383,500</strong><span>Median sale price</span></div>
    <div class="local-market-stat"><p>Macomb County</p><strong>$281,500</strong><span>Median sale price</span></div>
    <p class="local-market-source">Source: Realcomp, September 2026. Residential and condominium sales combined. County medians are not individual home valuations.</p>
  </div>
</section>

<section class="home-communities site-shell twelve-grid">
  <div class="community-section-title"><p class="eyebrow">Around Oakland & Macomb</p><h2>Where do you<br>see yourself?</h2><p>Start with a few places you’re considering. I can help you compare homes and figure out what fits.</p><a class="text-link" href="/communities">Take a look around <span aria-hidden="true">↗</span></a></div>
  <div class="community-link-grid">${localGuides.map(([slug, name, county]) => `<a href="/area/${slug}"><span>${county}</span><strong>${name}</strong><b aria-hidden="true">↗</b></a>`).join("")}</div>
</section>

<section class="client-story" id="client-reviews">
  <img class="client-story-image" src="/assets/testimonial-living-room.webp" width="1600" height="1200" loading="lazy" alt="">
  <div class="site-shell twelve-grid">
    <div class="client-story-card">
      <p class="eyebrow">In a client’s words</p>
      <blockquote>“Susie was great to work with. She was knowledgeable about the market and we appreciated her communication throughout the selling and buying process. Susie had our best interest at heart.”</blockquote>
      <p class="client-name">Julette Lynn Lymon</p><p class="client-context">Bought and sold a condo in Novi · June 2024</p><a href="https://www.zillow.com/profile/susiesharak#reviews" target="_blank" rel="noopener noreferrer">Read the review on Zillow <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>

`;
