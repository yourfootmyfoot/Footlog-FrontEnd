import { cn } from '@/lib/utils';

function ProTag({ className, isPro = false, ...props }) {
  return (
    <div
      className={cn(
        'flex justify-center items-center text-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer',
        {
          'bg-main font-bold text-white hover:bg-opacity-90': isPro,
          'bg-slate-200 text-gray-800 hover:bg-gray-200': !isPro,
        },
        className
      )}
      {...props}
    >
      {isPro ? '선출' : '비선출'}
    </div>
  );
}

export default ProTag;
