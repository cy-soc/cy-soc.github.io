fetch("data/organizers.json")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then((organizers) => {
    const list = document.getElementById("organizers-list");

    organizers.forEach((o) => {
      const li = document.createElement("li");

      // Name (linked if website exists)
      const nameEl = document.createElement("strong");
      nameEl.textContent = o.name;

      if (o.website) {
        const link = document.createElement("a");
        link.href = o.website;
        link.target = "_blank";
        link.rel = "noopener";
        link.appendChild(nameEl);
        li.appendChild(link);
      } else {
        li.appendChild(nameEl);
      }

      li.append(` \u2014 ${o.affiliation} `);

      // Social icons
      const socials = [
        { url: o.x, icon: "fa-x-twitter", label: "X / Twitter" },
        { url: o.bluesky, icon: "fa-bluesky", label: "Bluesky" },
        { url: o.google_scholar, icon: "fa-google-scholar", label: "Google Scholar" },
      ];

      socials.forEach((s) => {
        if (!s.url) return;
        const a = document.createElement("a");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "social-link";
        a.title = s.label;

        const icon = document.createElement("i");
        icon.className = `fa-brands ${s.icon}`;
        icon.setAttribute("aria-hidden", "true");
        a.appendChild(icon);

        const srText = document.createElement("span");
        srText.className = "visually-hidden";
        srText.textContent = s.label;
        a.appendChild(srText);

        li.appendChild(a);
      });

      list.appendChild(li);
    });
  })
  .catch((err) => {
    console.error("Failed to load organizers:", err);
    const list = document.getElementById("organizers-list");
    list.innerHTML = "<li>Unable to load organizers.</li>";
  });
