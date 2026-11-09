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
      <h1>Buying or selling?<br>Let’s talk.</h1>
      <p>I’m Susie. I’ll help you understand your options and make your next move with confidence.</p>
      <div class="hero-actions">
        <a class="button button-light" href="/home-value#valuation-form">Get my home value</a>
        <a class="hero-call" href="tel:+12489436906">Call Susie <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>

<section class="personal-introduction site-shell twelve-grid">
  <div class="introduction-title"><p class="eyebrow">Meet your local agent</p><h2>A little about me.</h2></div>
  <div class="introduction-copy"><p>I’m Susie Sharak with Golden Realty. I work with buyers and sellers in Royal Oak, Troy, Shelby Township and communities across Oakland and Macomb County.</p><p>Whether you’re ready to move or just figuring things out, we can start with what matters to you.</p><a class="text-link" href="/about">Meet Susie <span aria-hidden="true">↗</span></a></div>
</section>

<section class="home-services site-shell">
  <div class="section-heading"><h2>Where would you like to start?</h2><p>A home search. A sale. A better idea of what comes next.</p></div>
  <div class="twelve-grid service-grid">
    <article class="service-card">
      <a href="/buy" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/living.webp" width="1200" height="801" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Buying</p><h3>Find your next home.</h3><p>Compare neighborhoods, understand the costs and know what to look for before making an offer.</p><a class="text-link" href="/buy#buyer-form">Let’s plan your search <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="service-card">
      <a href="/sell" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/kitchen.webp" width="1200" height="675" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Selling</p><h3>Make a plan to sell.</h3><p>Get a clear look at pricing, preparation and timing before you spend money getting ready.</p><a class="text-link" href="/sell#seller-form">Talk through a sale <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="service-card">
      <a href="/home-value" class="service-image" tabindex="-1" aria-hidden="true"><img src="/assets/estate.webp" width="1200" height="798" loading="lazy" alt=""></a>
      <div class="service-copy"><p class="eyebrow">Home value</p><h3>What could yours sell for?</h3><p>A local comparison based on your home’s condition, recent sales and the competition.</p><a class="text-link" href="/home-value#valuation-form">Request your home value <span aria-hidden="true">↗</span></a></div>
    </article>
  </div>
  <p class="photography-note">Home photography is illustrative, not an available listing.</p>
</section>

<section class="local-market-band">
  <div class="site-shell twelve-grid local-market-grid">
    <div class="local-market-copy"><p class="eyebrow">September 2026 market snapshot</p><h2>What’s happening locally?</h2><p>More homes were available than a year earlier. What that means for you depends on the home and its competition.</p><a class="text-link" href="/market-update">Read the county market update <span aria-hidden="true">↗</span></a></div>
    <div class="local-market-stat"><p>Oakland County</p><strong>$383,500</strong><span>Median sale price</span></div>
    <div class="local-market-stat"><p>Macomb County</p><strong>$281,500</strong><span>Median sale price</span></div>
    <p class="local-market-source">Source: Realcomp, September 2026. Residential and condominium sales combined. County medians are not individual home valuations.</p>
  </div>
</section>

<section class="home-communities site-shell twelve-grid">
  <div class="community-section-title"><p class="eyebrow">A closer look at the area</p><h2>Find your place<br>in the neighborhood.</h2><p>Local guides with the details worth checking before you buy or sell.</p><a class="text-link" href="/communities">All community guides <span aria-hidden="true">↗</span></a></div>
  <div class="community-link-grid">${localGuides.map(([slug, name, county]) => `<a href="/area/${slug}"><span>${county}</span><strong>${name}</strong><b aria-hidden="true">↗</b></a>`).join("")}</div>
</section>

<section class="client-story">
  <img class="client-story-image" src="/assets/twilight.webp" width="1280" height="873" loading="lazy" alt="Illustrative home exterior at dusk">
  <div class="site-shell twelve-grid">
    <div class="client-story-card">
      <p class="eyebrow">In a client’s words</p>
      <blockquote>“Susie was great to work with. She was knowledgeable about the market and we appreciated her communication throughout the selling and buying process. Susie had our best interest at heart.”</blockquote>
      <p class="client-name">Julette Lynn Lymon</p><p class="client-context">Bought and sold a condo in Novi · June 2024</p>
    </div>
  </div>
</section>

`;
