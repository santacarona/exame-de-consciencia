import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

/**
 * Google AdSense — Banner Mobile (320×50)
 *
 * Para ativar os anúncios reais:
 *  1. No index.html, descomente a tag <script> do AdSense e substitua o Publisher ID.
 *  2. Substitua os valores abaixo:
 *     - data-ad-client → seu Publisher ID  (ex: "ca-pub-1234567890123456")
 *     - data-ad-slot   → ID do bloco      (ex: "9876543210")
 */

const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'; // ← substitua pelo seu Publisher ID
const AD_SLOT   = 'XXXXXXXXXX';             // ← substitua pelo ID do bloco de anúncio

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
      <span className="text-[9px] text-parchment/15 uppercase tracking-[0.2em] font-sans select-none">
        Publicidade
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '320px', height: '50px' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="fixed"
      />
    </div>
  );
};
