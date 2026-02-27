fetch("data/organizers.json")
  .then((res) => res.json())
  .then((organizers) => {
    const list = document.getElementById("organizers-list");

    organizers.forEach((o) => {
      const li = document.createElement("li");

      // Name (linked if website exists)
      const name = o.website
        ? `<a href="${o.website}" target="_blank" rel="noopener"><strong>${o.name}</strong></a>`
        : `<strong>${o.name}</strong>`;

      // Social icons
      const icons = [];
      if (o.x) {
        icons.push(
          `<a href="${o.x}" target="_blank" rel="noopener" class="social-link" title="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>`
        );
      }
      if (o.bluesky) {
        icons.push(
          `<a href="${o.bluesky}" target="_blank" rel="noopener" class="social-link" title="Bluesky"><i class="fa-brands fa-bluesky"></i></a>`
        );
      }
      if (o.google_scholar) {
        icons.push(
          `<a href="${o.google_scholar}" target="_blank" rel="noopener" class="social-link" title="Google Scholar"><i class="fa-brands fa-google-scholar"></i></a>`
        );
      }

      li.innerHTML = `${name} &mdash; ${o.affiliation} ${icons.join(" ")}`;
      list.appendChild(li);
    });
  });
