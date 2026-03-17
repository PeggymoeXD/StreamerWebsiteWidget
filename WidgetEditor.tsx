import { useState } from 'react';
import { StreamerWidget } from './StreamerWidget';
import { Copy, Download } from 'lucide-react';

export function WidgetEditor() {
  const [config, setConfig] = useState({
    name: 'NightOwl Gaming',
    logo: 'https://placehold.co/400x150/8b5cf6/ffffff/png?text=Your+Logo',
    picture: 'https://placehold.co/400x400/8b5cf6/ffffff/png?text=Profile+Picture',
    bio: 'This is the bio section',
    picturePosition: 'right' as 'left' | 'right',
    backgroundColor: '#8b5cf6',
    backgroundOpacity: 100,
    socials: {
      twitter: { enabled: true, url: 'https://twitter.com' },
      instagram: { enabled: true, url: 'https://instagram.com' },
      youtube: { enabled: true, url: 'https://youtube.com' },
      twitch: { enabled: true, url: 'https://twitch.tv' },
      website: { enabled: true, url: 'https://example.com' },
    },
  });

  const updateConfig = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateSocial = (platform: string, field: 'enabled' | 'url', value: any) => {
    setConfig(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: {
          ...prev.socials[platform as keyof typeof prev.socials],
          [field]: value,
        },
      },
    }));
  };

  const getEnabledSocials = () => {
    const result: Record<string, string> = {};
    Object.entries(config.socials).forEach(([key, value]) => {
      if (value.enabled && value.url) {
        result[key] = value.url;
      }
    });
    return result;
  };

  const generateHTML = () => {
    const socials = getEnabledSocials();
    const icons = {
      twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>',
      instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>',
      youtube: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>',
      twitch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>',
      website: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>',
    };

    const hexToRgba = (hex: string, opacity: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };

    const socialLinks = Object.entries(socials)
      .map(([platform, url]) => {
        const icon = icons[platform as keyof typeof icons];
        return `                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label="${platform.charAt(0).toUpperCase() + platform.slice(1)}">
                        <span class="text-white group-hover:text-white/90">${icon}</span>
                    </a>`;
      })
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Streamer Widget</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #111827;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
    </style>
</head>
<body>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden" style="background-color: ${hexToRgba(config.backgroundColor, config.backgroundOpacity)}; border-radius: 24px;">
            <div class="p-8">
                <div class="flex items-start gap-6 mb-6 ${config.picturePosition === 'left' ? 'flex-row' : 'flex-row-reverse'}">
                    <div class="flex-shrink-0">
                        <img src="${config.picture}" alt="${config.name}" class="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                    </div>
                    <div class="flex-1">
                        <img src="${config.logo}" alt="${config.name} Logo" class="max-w-full h-auto max-h-24 object-contain" />
                    </div>
                </div>
                <p class="text-white text-base leading-relaxed mb-6">
                    ${config.bio}
                </p>
                <div class="flex gap-3 flex-wrap">
${socialLinks}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      alert('✅ Embed code copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy. Please try again.');
    }
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'streamer-widget.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-screen">
      {/* Editor Panel */}
      <div className="bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🎮 Streamer Widget Editor
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Customize your widget below and see changes in real-time
          </p>

          {/* Basic Info */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              ✨ Basic Information
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Streamer Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => updateConfig('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                value={config.logo}
                onChange={(e) => updateConfig('logo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Your channel logo or branding
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                value={config.picture}
                onChange={(e) => updateConfig('picture', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload to Imgur or ImgBB and paste the link
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={config.bio}
                onChange={(e) => updateConfig('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Tell viewers about yourself"
              />
            </div>
          </div>

          {/* Style Options */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              🎨 Style Options
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Picture Position
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateConfig('picturePosition', 'left')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                    config.picturePosition === 'left'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Left
                </button>
                <button
                  type="button"
                  onClick={() => updateConfig('picturePosition', 'right')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                    config.picturePosition === 'right'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="w-16 h-10 rounded-md border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="#8b5cf6"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Background Opacity: {config.backgroundOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.backgroundOpacity}
                onChange={(e) => updateConfig('backgroundOpacity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              🔗 Social Links
            </h2>

            {(['twitter', 'instagram', 'youtube', 'twitch', 'website'] as const).map((platform) => (
              <div key={platform} className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700 capitalize">
                    {platform}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateSocial(platform, 'enabled', !config.socials[platform].enabled)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.socials[platform].enabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.socials[platform].enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <input
                  type="text"
                  value={config.socials[platform].url}
                  onChange={(e) => updateSocial(platform, 'url', e.target.value)}
                  disabled={!config.socials[platform].enabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                  placeholder={`https://${platform}.com/yourhandle`}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <button
              onClick={copyEmbedCode}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors mb-2 flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Embed Code
            </button>
            <button
              onClick={downloadHTML}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download HTML File
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Upload the HTML file to GoDaddy or embed in your site
            </p>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-gray-900 overflow-y-auto p-12 flex items-center justify-center">
        <StreamerWidget
          streamerName={config.name}
          streamerLogo={config.logo}
          streamerPicture={config.picture}
          streamerBio={config.bio}
          streamerSocials={getEnabledSocials()}
          picturePosition={config.picturePosition}
          backgroundColor={config.backgroundColor}
          backgroundOpacity={config.backgroundOpacity}
        />
      </div>
    </div>
  );
}