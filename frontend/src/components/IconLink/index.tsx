export function IconLink({
  href,
  iconSrc,
  alt,
  css,
}: {
  href: string;
  iconSrc: string;
  alt: string;
  css?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={css}>
      <img src={iconSrc} alt={alt} className="h-4 w-4" />
    </a>
  );
}
