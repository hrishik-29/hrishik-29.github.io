/* ===== Projects Data & Rendering ===== */
const projectsData = [
  {
    title: "Reddit Skill Trend Forecasting",
    desc: "End-to-end pipeline scraping 10,000+ Reddit posts to analyze emerging skill trends using Weighted Skill Score with VADER sentiment and gradient boosting forecasting.",
    tags: ["Python", "PRAW", "NLP", "ML"],
    type: "ml", status: "completed",
    icon: "📊",
    github: "https://github.com/hrishik-29/Reddit-Skill-Trend-Forecaster",
    preview: ""
  },
  {
    title: "Brain Tumor Segmentation",
    desc: "Multimodal VLM + U-Net framework with CLIP-based text-guided cross-attention fusion for FLAIR MRI segmentation. Focal Tversky Loss and Grad-CAM visualizations.",
    tags: ["Python", "Deep Learning", "U-Net", "CLIP"],
    type: "ml", status: "completed",
    icon: "🧠",
    github: "https://github.com/hrishik-29/brain-tumor-segmentation",
    preview: ""
  },
  {
    title: "Fake News Detection System",
    desc: "Text classification achieving 94% accuracy with Naive Bayes. NLP preprocessing with tokenization, stop-word removal, and TF-IDF. Deployed as Streamlit app.",
    tags: ["Python", "Scikit-learn", "NLP", "Streamlit"],
    type: "ml", status: "completed",
    icon: "📰",
    github: "https://github.com/hrishik-29/Fake_News_detector",
    preview: ""
  },
  {
    title: "Pediatric Bone Age Prediction",
    desc: "Medical imaging model estimating pediatric bone age from hand X-rays using ResNet50 transfer learning on the RSNA dataset.",
    tags: ["Python", "Deep Learning", "ResNet50"],
    type: "ml", status: "completed",
    icon: "🦴",
    github: "https://github.com/hrishik-29/Bone-Age-Prediction",
    preview: ""
  },
  {
    title: "VANET Intrusion Detection",
    desc: "IDS for Vehicular Ad Hoc Networks using ConvGRU + XGBoost ensemble on VeReMi dataset with FGSM adversarial robustness evaluation.",
    tags: ["Python", "Deep Learning", "Scikit-learn"],
    type: "ml", status: "completed",
    icon: "🚗",
    github: "https://github.com/hrishik-29/vanet-intrusion-detection",
    preview: ""
  },
  {
    title: "Electricity Bill Prediction",
    desc: "Regression pipeline evaluating linear regression, decision trees, and random forests with EDA, feature preprocessing, and cross-validation.",
    tags: ["Python", "Scikit-learn", "Regression"],
    type: "ml", status: "completed",
    icon: "⚡",
    github: "https://github.com/hrishik-29/ElectricityBillPrediction",
    preview: ""
  },
  {
    title: "Multimedia Data Augmentation",
    desc: "Advanced data augmentation strategies for multimedia processing with comprehensive notebooks and model robustness evaluation.",
    tags: ["Python", "NumPy", "Matplotlib"],
    type: "ml", status: "completed",
    icon: "🎨",
    github: "https://github.com/hrishik-29/multimedia-data-augmentation",
    preview: ""
  },
  {
    title: "Voice Translator",
    desc: "Real-time multi-language voice translator using Whisper STT, Google Translate, and Edge TTS. Supports English, Hindi, Tamil, Telugu with Raspberry Pi deployment.",
    tags: ["Python", "Streamlit", "Whisper"],
    type: "web", status: "completed",
    icon: "🎙️",
    github: "https://github.com/hrishik-29/voice-translator",
    preview: ""
  },
  {
    title: "Personal Tracker",
    desc: "Full-stack productivity dashboard with task management, habit tracking, goal setting, reading logs, KanBan boards, and focus mode. Built with React and Firebase.",
    tags: ["React", "Vite", "Firebase", "Node.js"],
    type: "web", status: "completed",
    icon: "📋",
    github: "https://github.com/hrishik-29/personal-tracker",
    preview: ""
  },
  {
    title: "FreshCart",
    desc: "Interactive grocery shopping app built with HCI methodology — F-Pattern layout, goal-gradient checkout, and micro-animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "web", status: "completed",
    icon: "🛒",
    github: "https://github.com/hrishik-29/freshcart",
    preview: "https://hrishik-29.github.io/freshcart/"
  },
  {
    title: "CricPulse",
    desc: "Cricket app with live scores, player stats, team standings, fantasy league, and video highlights. Built with Fitts's Law and Hick's Law.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "web", status: "completed",
    icon: "🏏",
    github: "https://github.com/hrishik-29/cricpulse",
    preview: "https://hrishik-29.github.io/cricpulse/"
  },
  {
    title: "Supermarket Billing",
    desc: "Full-stack billing and inventory management system with admin dashboard, customer management, cart checkout, payment gateway, and secure authentication.",
    tags: ["PHP", "MySQL", "HTML/CSS"],
    type: "web", status: "completed",
    icon: "🏪",
    github: "https://github.com/hrishik-29/supermarket-billing",
    preview: "https://hrishik-29.github.io/supermarket-billing/"
  },
  {
    title: "Ultimate Run",
    desc: "Campus delivery and errand platform where students post item requests and helpers accept them. Flask backend with session-based tracking and tip support.",
    tags: ["Python", "Flask", "HTML/CSS"],
    type: "web", status: "completed",
    icon: "🏃",
    github: "https://github.com/hrishik-29/ultimate-run",
    preview: "https://hrishik-29.github.io/ultimate-run/"
  }
];

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = projectsData.filter(p => filter === 'all' || p.type === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;">No projects found.</p>';
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const previewLink = p.preview
      ? `<a href="${p.preview}" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>`
      : '';

    return `
    <div class="project-card${p.featured ? ' featured' : ''}">
      <div>
        <div class="card-header">
          <div class="card-icon">${p.icon}</div>
          <div class="card-links">
            <a href="${p.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
            ${previewLink}
          </div>
        </div>
        <h3>${p.title}</h3>
        <p class="card-desc">${p.desc}</p>
      </div>
      <div>
        <div class="card-tags">
          ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
          <span class="card-status ${p.status}">${p.status === 'wip' ? 'In Progress' : 'Completed'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.dataset.filter);
    });
  });
});
