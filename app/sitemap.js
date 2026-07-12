export default function sitemap() {
  return [
    {
      url: "https://www.webwerkfranken.de",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.webwerkfranken.de/impressum",
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: "https://www.webwerkfranken.de/datenschutz",
      lastModified: new Date(),
      priority: 0.3,
    },
  ];
}