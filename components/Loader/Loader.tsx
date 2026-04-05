interface LoaderProps {
  fullScreen?: boolean;
}

export const PageLoader = ({ fullScreen = false }: LoaderProps) => {
  const dots = Array.from({ length: 8 });

  return (
    <div
      className={`z-50 flex items-center justify-center bg-[#111111]/60 backdrop-blur-sm ${fullScreen ? 'fixed inset-0' : 'absolute inset-0 min-h-75'}`}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        {dots.map((_, i) => (
          <div
            key={i}
            className="animate-loader-pulse absolute h-4.5 w-4.5 rounded-full"
            style={
              {
                background: 'radial-gradient(circle, #ffffff 0%, #10b981 70%)',
                transform: `rotate(${i * 45}deg) translate(45px)`,
                animationDelay: `${i * 0.15}s`,
                '--tw-translate-dist': '45px',
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};
