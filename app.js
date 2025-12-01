const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Static config to return
const baseConfig = {
  version: 1,
  app_id: "6d849a76d11f478ba13040e38205287e",
  app_key: "10000157384",
  ads_visible: true,
  banner_ads: [
    {
      placement_type: "tourney_reg_popup",
      inMobi: {
        placement_id: "10000551428",
        segment_id: "touney_reg_inmobi_A"
      },
      internal: {
        bannerImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBrJnhzlS504lqvTbJHd-PPxFHUJilbkD5A&s",
        segment_id: "touney_reg_internal_A",
        action: {
          location: "wrench_menu"
        }
      }
    },
    {
      placement_type: "wrench_menu",
      inMobi: {
        placement_id: "10000551457",
        segment_id: "wrench_menu_inmobi_A"
      },
      internal: {
        bannerImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBrJnhzlS504lqvTbJHd-PPxFHUJilbkD5A&s",
        segment_id: "wrench_menu_internal_A",
        action: {
          location: "Tourney"
        }
      }
    },
    {
      placement_type: "home_page_overlay",
      inMobi: {
        placement_id: "10000551441",
        segment_id: "home_page_overlay_inmobi_A"
      },
      internal: {
        bannerImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBrJnhzlS504lqvTbJHd-PPxFHUJilbkD5A&s",
        segment_id: "home_page_overlay_internal_A",
        action: {
          location: "Tourney"
        }
      }
    },
    {
      placement_type: "tourney_promotional_banner",
      inMobi: {
        placement_id: "10000551415",
        segment_id: "tourney_promotional_banner_inmobi_A"
      },
      internal: {
        bannerImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBrJnhzlS504lqvTbJHd-PPxFHUJilbkD5A&s",
        segment_id: "tourney_promotional_banner_internal_A",
        action: {
          location: "Tourney"
        }
      }
    },
  ],
  tourney_lock: {
    is_locked: true,
    prizeWorth: "₹ 10,000",
    placement_id : "10000551471",
    btnText: "Watch Ads",
    segment_id : "touney_lock_seg_A"
  }
};

// GET /fetchAdsConfig?channel=...
app.get('/fetchAdsConfig', (req, res) => {
  const { channel } = req.query;

  if (!channel || typeof channel !== 'string' || !channel.trim()) {
    return res.status(400).json({ error: 'Missing required query parameter: channel' });
  }

  // Return exactly the provided config JSON (no extra fields)
  return res.json(baseConfig);
});

// Health endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'ads-config-server' });
});

// 404 for other routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
