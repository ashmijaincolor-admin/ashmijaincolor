'use strict';

(function () {
  // The contact form handler is defined in js/public/script.js to prevent duplicate bindings.





  async function loadAllSections() {
    const optionalRenderers = [
      { name: 'renderPortfolioToMainSite', fn: window.renderPortfolioToMainSite },
      { name: 'renderArtistsToMainSite', fn: window.renderArtistsToMainSite },
      { name: 'renderConfigToMainSite', fn: window.renderConfigToMainSite },
      { name: 'renderFAQsToMainSite', fn: window.renderFAQsToMainSite },
    ];

    const availableRenders = optionalRenderers.filter((entry) => typeof entry.fn === 'function');
    if (availableRenders.length === 0) {
      return Promise.resolve();
    }

    await Promise.all(availableRenders.map(async (entry) => {
      try {
        await entry.fn();
      } catch (err) {
        console.warn(`[data-loader] ${entry.name} failed`, err);
      }
    }));
  }

  window.loadAllSections = loadAllSections;

  function bindContentSyncListeners() {
    const refreshSections = () => {
      loadAllSections().catch((err) => {
        console.warn('[data-loader] loadAllSections failed', err);
      });
    };

    window.addEventListener('storage', (event) => {
      if (event.key === 'ashmija_content_sync') {
        refreshSections();
      }
    });

    window.addEventListener('ashmija:content-sync', refreshSections);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        refreshSections();
      }
    });
  }

  function initDataLoader() {
    bindContentSyncListeners();
    loadAllSections().catch((err) => {
      console.warn('[data-loader] loadAllSections failed', err);
    });
  }

  document.addEventListener('DOMContentLoaded', initDataLoader);
})();
