export const brokerage = "Golden Key Realty Group LLC";

export const agentProfiles = [
  { name: "Zillow", url: "https://www.zillow.com/profile/susiesharak", logo: "/assets/zillow-logo.svg", detail: "Read client reviews" },
  { name: "Realtor.com", url: "https://www.realtor.com/realestateagents/5f16af077e854c0011079d63", logo: "/assets/realtor-logo.svg", detail: "See listings and sales" },
  { name: "SOLD.com", url: "https://www.sold.com/agent-profile/Susie-Sharak-154288", logo: "/assets/sold-logo.svg", detail: "Read client reviews" },
  { name: "Homes.com", url: "https://www.homes.com/real-estate-agents/susie-sharak/wyy5z3l/", logo: "/assets/homes-logo.png", detail: "See past sales" },
  { name: "FastExpert", url: "https://www.fastexpert.com/agents/susie-sharak-96097/", logo: "/assets/fastexpert-logo.png", detail: "Read reviews and ratings" },
];

export function profileLinks() {
  return `<section class="profile-section" aria-label="Susie’s real estate profiles"><div class="site-shell profile-grid">${agentProfiles.map(({ name, url, logo }) => `<a class="profile-card" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="View Susie Sharak on ${name}">${logo ? `<img src="${logo}" width="160" height="42" alt="${name}">` : `<strong class="profile-name">${name}</strong>`}</a>`).join("")}</div></section>`;
}

export function magazineFeature() {
  return `<section class="magazine-feature site-shell twelve-grid"><a class="magazine-cover" href="/assets/susie-top-agent-cover.webp" target="_blank" rel="noopener noreferrer" aria-label="View Susie’s Top Agent Magazine Michigan cover"><img src="/assets/susie-top-agent-cover.webp" width="791" height="1024" loading="lazy" alt="Top Agent Magazine Michigan edition cover featuring Susie Sharak"></a><div class="magazine-copy"><h2>A little more about me.</h2><p>I was featured on the cover of the Michigan edition of Top Agent Magazine. It’s a part of my story I’m proud to share.</p><p>But what matters most is how you feel working with me. My clients talk about communication, patience and having someone on their side. That’s the kind of help I want you to have.</p><a class="text-link" href="#contact-form">Tell me about your next move <span aria-hidden="true">↗</span></a></div></section>`;
}
