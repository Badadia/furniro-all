export function IconLink({
  href,
  iconSrc,
  alt,
}: {
  href: string;
  iconSrc: string;
  alt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.2)]"
    >
      <img src={iconSrc} alt={alt} className="h-4 w-4" />
    </a>
  );
}
