import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  asChild?: boolean;
}

export function Skeleton({ className, asChild }: SkeletonProps) {
  const Comp = asChild ? 'span' : 'div';

  return (
    <Comp
      className={cn(
        'animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/50',
        className,
      )}
    />
  );
}