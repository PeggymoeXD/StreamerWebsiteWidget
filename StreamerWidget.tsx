import { ExternalLink, Instagram, Twitter, Youtube, Twitch } from 'lucide-react';

export interface StreamerWidgetProps {
  streamerName: string;
  streamerLogo: string;
  streamerPicture: string;
  streamerBio: string;
  streamerSocials?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    website?: string;
  };
  picturePosition?: 'left' | 'right';
  backgroundColor?: string;
  backgroundOpacity?: number;
}

export function StreamerWidget({
  streamerName,
  streamerLogo,
  streamerPicture,
  streamerBio,
  streamerSocials = {},
  picturePosition = 'right',
  backgroundColor = '#8b5cf6',
  backgroundOpacity = 100,
}: StreamerWidgetProps) {
  const socialPlatforms = [
    { name: 'Twitter', url: streamerSocials.twitter, Icon: Twitter },
    { name: 'Instagram', url: streamerSocials.instagram, Icon: Instagram },
    { name: 'YouTube', url: streamerSocials.youtube, Icon: Youtube },
    { name: 'Twitch', url: streamerSocials.twitch, Icon: Twitch },
    { name: 'Website', url: streamerSocials.website, Icon: ExternalLink },
  ].filter(platform => platform.url);

  // Convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  return (
    <div 
      className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
      style={{ 
        backgroundColor: hexToRgba(backgroundColor, backgroundOpacity),
        borderRadius: '24px',
        minHeight: '400px'
      }}
    >
      <div className="p-8">
        {/* Logo at top, centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <img
            src={streamerLogo}
            alt={`${streamerName} Logo`}
            style={{ maxHeight: '64px', maxWidth: '20rem', width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        </div>
        
        {/* Profile Picture + Bio side by side (horizontal frame) */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: picturePosition === 'left' ? 'row' : 'row-reverse',
            alignItems: 'flex-start', 
            gap: '1.5rem', 
            marginBottom: '2rem', 
            minHeight: '150px' 
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <img
              src={streamerPicture}
              alt={streamerName}
              style={{ 
                width: '128px', 
                height: '128px', 
                minWidth: '128px', 
                minHeight: '128px', 
                borderRadius: '1rem', 
                objectFit: 'cover', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontSize: '1rem', lineHeight: 1.625, margin: 0, overflowWrap: 'break-word' }}>
              {streamerBio}
            </p>
          </div>
        </div>
        
        {/* Social links centered */}
        {socialPlatforms.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {socialPlatforms.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label={name}
              >
                <Icon className="w-6 h-6 text-white group-hover:text-white/90" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
