const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

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
      placement_type: "toureny_reg_popup",
      inMobi: {
        placement_id: "123456",
        segment_id: "touney_reg_inmobi_A"
      },
      internal: {
        bannerImageUrl: "",
        segment_id: "touney_reg_internal_A",
        action: {
          location: "wrench_menu"
        }
      }
    },
    {
      placement_type: "wrench_menu",
      inMobi: {
        placement_id: "789101112",
        segment_id: "wrench_menu_inmobi_A"
      },
      internal: {
        bannerImageUrl: "",
        segment_id: "wrench_menu_internal_A",
        action: {
          location: "Tourney"
        }
      }
    },
    {
      placement_type: "home_page_overlay",
      inMobi: {
        placement_id: "1415161718",
        segment_id: "home_page_overlay_inmobi_A"
      },
      internal: {
        bannerImageUrl: "",
        segment_id: "home_page_overlay_internal_A",
        action: {
          location: "Tourney"
        }
      }
    }
  ],
  video_ads: [
    {
      placement_type: "tourney_lobby",
      inMobi: {
        placement_id: "789101112",
        segment_id: "tourney_lobby_A"
      },
      internal: {
        video_URL: "",
        segment_id: "wrench_menu_internal_A"
      }
    }
  ],
  toureny_lock: {
    is_locked: true,
    prizeWorth: "₹ 10,000",
    btnText: "Watch Ads"
  }
};

// GET /fetchAdsConfig?channel=...
app.get('/fetchAdsConfig', (req, res) => {
  const { channel } = req.query;

  if (!channel || typeof channel !== 'string' || !channel.trim()) {
    return res.status(400).json({ error: 'Missing required query parameter: channel' });
  }

  // For now, we just return the static config along with the channel echoed back
  // Return exactly the provided config JSON (no extra fields)
  return res.json(baseConfig);
});

// Health endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'ads-config-server' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
