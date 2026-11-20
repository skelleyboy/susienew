// Keep indexed legacy URLs useful without publishing duplicate landing pages.
export const legacyRedirects: Record<string, string> = {
  "/grosse-pointe-real-estate": "/area/grosse-pointe",
  // No equivalent city guide exists for these locations. The community index
  // is the closest relevant destination; do not redirect to an unrelated city.
  "/novi-real-estate": "/communities",
  "/dearborn-real-estate": "/communities",
  "/sterling-heights-real-estate": "/area/sterling-heights",
  "/troy-real-estate": "/area/troy",
  "/shelby-township-real-estate": "/area/shelby-township",
  "/royal-oak-real-estate": "/area/royal-oak",
  "/rochester-hills-real-estate": "/area/rochester-hills",
  "/macomb-township-real-estate": "/area/macomb-township",
  "/birmingham-real-estate": "/area/birmingham",
  "/washington-twp-real-estate": "/area/washington-twp",
  "/washington-township-real-estate": "/area/washington-twp",
  "/bloomfield-hills-real-estate": "/area/bloomfield-hills",
  "/clinton-township-real-estate": "/area/clinton-township",
};
