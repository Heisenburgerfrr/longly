"use client";

import React, { useState } from "react";
import styles from "./UseCaseSlider.module.scss";

type TabId = "business-cards" | "social-bios" | "group-chats";

interface TabContent {
  id: TabId;
  tabLabel: string;
  title: string;
  description: string;
  linkText: string;
  preview: React.ReactNode;
}

export default function UseCaseSlider() {
  const [activeTab, setActiveTab] = useState<TabId>("business-cards");

  const useCases: TabContent[] = [
    {
      id: "business-cards",
      tabLabel: "Business Cards",
      title: "The Multi-Page Business Card",
      description:
        "Why hand out a tiny card with a forgettable, short URL? Impress prospective clients with a folded booklet detailing a 128-word Longly URL. Demonstrates immediate engineering commitment, paper weight, and spatial complexity.",
      linkText: "Design a business card layout",
      preview: (
        <div className={styles.businessCardMock}>
          <div className={styles.bcLogo}>LONGLY CORP</div>
          <div className={styles.bcLink}>
            longly.co/noble-mountain-breeze-whisper-candle-guitar-ocean-stone-valley-light-shadow-dream-river-plate-chair-cloud
          </div>
          <div>
            <div className={styles.bcName}>Marcus Sterling</div>
            <div className={styles.bcTitle}>
              Senior Director of Length Operations
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "social-bios",
      tabLabel: "Social Bios",
      title: "Bypass Profile Character Limits",
      description:
        "Standard social platforms limit your expression. Maximize your digital footprint by replacing your entire profile description with one grand, explanatory Longly link. Everyone will understand you are a serious technologist who values maximum payload size.",
      linkText: "Optimize profile bios",
      preview: (
        <div className={styles.bioMock}>
          <div className={styles.bioHeader}>
            <div className={styles.bioAvatar} />
            <div className={styles.bioMeta}>
              <span className={styles.bioUsername}>@ultra_coder</span>
              <span className={styles.bioFollowers}>142K followers</span>
            </div>
          </div>
          <p className={styles.bioText}>
            Web Architect. Database Minimalist. I encode my life stories
            directly in my link:
          </p>
          <span className={styles.bioLink}>
            longly.co/ancient-forest-spirit-drum-flute-ancient-castle-gate-guard-armor-shield-sword-victory-crown-king-throne
          </span>
        </div>
      ),
    },
    {
      id: "group-chats",
      tabLabel: "Group Chats",
      title: "Maximize Chat Real Estate",
      description:
        "Ensure your messages cannot be skimmed or bypassed in busy Slack threads or family group messages. Post a single link that spans three complete viewports of screen height. Dominate the virtual conversation with raw word counts.",
      linkText: "Dominate chat threads",
      preview: (
        <div className={styles.chatMock}>
          <div className={styles.chatMessage}>
            <span className={styles.chatUser}>Alex (Product Manager)</span>
            <div className={styles.chatBubble}>
              Hey team, where are the spec documents stored?
            </div>
          </div>
          <div className={styles.chatMessage}>
            <span className={styles.chatUser}>You</span>
            <div className={styles.chatBubbleLong}>
              longly.co/paper-folder-document-specification-draft-revision-final-final-updated-reviewed-signed-approved-certified-valid-locked-archived
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = useCases.find((uc) => uc.id === activeTab) || useCases[0];

  const handleCtaClick = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="absurd-use-cases" className={styles.sliderSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.preHeading}>Real-World Satire</span>
          <h2 className={styles.heading}>Absurd Use Cases</h2>
        </div>

        <div className={styles.tabs}>
          {useCases.map((uc) => (
            <button
              key={uc.id}
              type="button"
              className={`${styles.tab} ${activeTab === uc.id ? styles.active : ""}`}
              onClick={() => setActiveTab(uc.id)}
            >
              {uc.tabLabel}
            </button>
          ))}
        </div>

        <div className={styles.contentBody}>
          <div className={styles.textCol}>
            <h3 className={styles.useCaseTitle}>{current.title}</h3>
            <p className={styles.useCaseDesc}>{current.description}</p>
            <span className={styles.readMore} onClick={handleCtaClick}>
              {current.linkText} <span className={styles.arrow}>→</span>
            </span>
          </div>

          <div className={styles.previewCol}>
            <div className={styles.previewFrame}>{current.preview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
