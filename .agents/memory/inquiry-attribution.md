---
name: Inquiry attribution
description: Privacy and reliability constraints for understanding where real inquiries originate.
---

Source attribution must stay limited to page paths, referrer domain and explicit campaign labels. Do not collect complete referring URLs, arbitrary query strings or form answers in browser storage.

**Why:** Inquiries may contain private information. Understanding lead sources does not justify collecting unrelated URL data or introducing a dependency that can prevent a genuine inquiry.

**How to apply:** Keep native form submission usable without scripts or browser storage. If optional source tracking is unavailable, preserve form delivery rather than blocking the visitor. Disclose source tracking in the privacy policy and do not add a third-party tracker silently.

Find inquiry forms using a persistent form class as well as Netlify detection attributes.

**Why:** Netlify processes form-detection attributes during deployment and may remove them from the served HTML. Attribution must not depend solely on an attribute intended for build-time detection.

**How to apply:** Keep detection attributes and hidden form-name fields in generated HTML, but use a stable form selector for runtime tracking too. Preserve the existing four form names, and keep phone required for seller and valuation inquiries and property address required for seller inquiries, as explicitly requested.
