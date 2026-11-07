import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

/**
 * Google AdSense — Bloco "exame-consciencia-banner-responsivo"
 */

const AD_CLIENT = 'ca-pub-2560972696133896';
const AD_SLOT   = '6174890984';

export const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // AdSense ainda não carregado — anúncio não será exibido
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center gap-1 ${className}`}>
      <span className="text-[10px] text-ink-muted-48 opacity-50 uppercase tracking-[0.18em] font-sans select-none">
        Publicidade
      </span>
      <div className="w-full rounded-lg border border-hairline overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="false"
        />
      </div>
    </div>
  );
};
