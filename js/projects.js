/* ===== Projects Data & Filter Logic ===== */
const projectsData = [
  {
    title: "Personal Tracker",
    desc: "A self-hosted life operating system combining task management, habit tracking, goal setting, and reading logs into a beautiful encrypted dashboard. Features KanBan boards, habit streaks, and a physics playground.",
    image: "assets/images/projects/personal-tracker.png",
    tags: ["React", "Node.js", "TailwindCSS", "Firebase", "AES-256"],
    type: "web",
    status: "completed",
    github: "https://github.com/hrishik-29/personal-tracker",
    preview: ""
  },
  {
    title: "Voice Translator",
    desc: "A real-time multi-language voice translator using Whisper for speech-to-text, Google Translator for translation, and Microsoft Edge TTS for output. Supports English, Hindi, Tamil, and Telugu with wearable Raspberry Pi deployment.",
    image: "assets/images/projects/voice-translator.png",
    tags: ["Python", "Streamlit", "Whisper", "Raspberry Pi", "WebRTC"],
    type: "ml",
    status: "completed",
    github: "https://github.com/hrishik-29/voice-translator",
    preview: ""
  },
  {
    title: "Brain Tumor Segmentation",
    desc: "A multimodal segmentation framework using VLM + U-Net with CLIP-based text-guided cross-attention fusion to segment FLAIR MRI brain slices. Uses Focal Tversky Loss and Grad-CAM visualizations.",
    image: "assets/images/projects/brain-tumor-segmentation.png",
    tags: ["PyTorch", "CLIP", "U-Net", "Grad-CAM", "Medical Imaging"],
    type: "ml",
    status: "completed",
    github: "https://github.com/hrishik-29/brain-tumor-segmentation",
    preview: ""
  },
  {
    title: "VANET Intrusion Detection",
    desc: "A robust IDS for Vehicular Ad Hoc Networks using ConvGRU + XGBoost ensemble on the VeReMi dataset. Features time-window statistical feature engineering and FGSM adversarial robustness evaluation.",
    image: "assets/images/projects/vanet-intrusion-detection.png",
    tags: ["XGBoost", "ConvGRU", "TensorFlow", "Scikit-learn"],
    type: "ml",
    status: "completed",
    github: "https://github.com/hrishik-29/vanet-intrusion-detection",
    preview: ""
  },
  {
    title: "FreshCart",
    desc: "An interactive grocery shopping application built with modern web technologies and strong HCI methodology. Features F-Pattern layout, goal-gradient checkout flows, and delightful micro-animations.",
    image: "assets/images/projects/freshcart.png",
    tags: ["HTML", "CSS", "JavaScript", "Vite"],
    type: "web",
    status: "completed",
    github: "https://github.com/hrishik-29/freshcart",
    preview: ""
  },
  {
    title: "CricPulse",
    desc: "A feature-rich cricket application with live match scores, player statistics, team standings, fantasy league, and video highlights. Built with HCI principles like Fitts's Law and Hick's Law.",
    image: "assets/images/projects/cricpulse.png",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "web",
    status: "completed",
    github: "https://github.com/hrishik-29/cricpulse",
    preview: ""
  },
  {
    title: "Multimedia Data Augmentation",
    desc: "Advanced data augmentation strategies for multimedia processing, including 5GHz signal processing analysis. Features comprehensive notebooks with model robustness evaluation.",
    image: "assets/images/projects/multimedia-data-augmentation.png",
    tags: ["Python", "Jupyter", "NumPy", "Matplotlib"],
    type: "ml",
    status: "completed",
    github: "https://github.com/hrishik-29/multimedia-data-augmentation",
    preview: ""
  },
  {
    title: "Supermarket Billing",
    desc: "A web-based supermarket billing and inventory management system with admin dashboard, customer management, checkout flow, and secure authentication using PHP sessions.",
    image: "assets/images/projects/supermarket-billing.png",
    tags: ["PHP", "MySQL", "TailwindCSS", "JavaScript"],
    type: "web",
    status: "wip",
    github: "https://github.com/hrishik-29/supermarket-billing",
    preview: ""
  },
  {
    title: "Ultimate Run",
    desc: "A campus delivery and errand request platform where students can post item requests and helpers can accept them. Features session-based tracking and tip support.",
    image: "assets/images/projects/ultimate-run.png",
    tags: ["Python", "Flask", "SQLite", "Jinja2"],
    type: "web",
    status: "wip",
    github: "https://github.com/hrishik-29/ultimate-run",
    preview: ""
  }
];

function renderProjects(filter = 'all', search = '') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const filtered = projectsData.filter(p => {
    const matchFilter = filter === 'all' || p.type === filter;
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });
  grid.innerHTML = filtered.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;">No projects found.</p>'
    : filtered.map(p => `
    <div class="glass-card project-card reveal visible">
      <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-meta">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          <span class="tag status ${p.status === 'wip' ? 'wip' : ''}">${p.status === 'wip' ? '🔄 In Progress' : '✅ Completed'}</span>
        </div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" class="gh-link">⟨/⟩ GitHub</a>
          <a href="${p.preview || '#'}" target="_blank" class="preview-link ${!p.preview ? 'disabled' : ''}">◉ Preview</a>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  const searchBox = document.getElementById('project-search');
  if (searchBox) searchBox.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-tag.active')?.dataset.filter || 'all';
    renderProjects(activeFilter, e.target.value);
  });
  document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const search = document.getElementById('project-search')?.value || '';
      renderProjects(tag.dataset.filter, search);
    });
  });
});
