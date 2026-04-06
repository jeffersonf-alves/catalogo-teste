// Mobile-first breakpoints
export const bp = { sm:"480px", md:"768px", lg:"1024px", xl:"1280px" };

export const up = {
  sm:  `@media (min-width:${bp.sm})`,
  md:  `@media (min-width:${bp.md})`,
  lg:  `@media (min-width:${bp.lg})`,
  xl:  `@media (min-width:${bp.xl})`,
};

export const down = {
  sm:  `@media (max-width:479px)`,
  md:  `@media (max-width:767px)`,
  lg:  `@media (max-width:1023px)`,
};

// shorthand kept for compat
export const mq = { sm: down.sm, md: down.md, lg: down.lg };
