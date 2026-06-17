import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'outline';
  className?: string;
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-primary text-primary-foreground hover:bg-primary/80 border-primary/20':
            variant === 'default',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary/20':
            variant === 'secondary',
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-destructive/20':
            variant === 'destructive',
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200/50 dark:border-green-800/30':
            variant === 'success',
          'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300/50 dark:border-slate-700/50':
            variant === 'outline',
        },
        className,
      )}
      {...props}
    />
  );
}