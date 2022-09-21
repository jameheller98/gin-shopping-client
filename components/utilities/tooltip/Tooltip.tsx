import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';

export type TTooltip = {
  content: string | string[];
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const Tooltip: React.FC<TTooltip> = ({
  content,
  icon = <ExclamationTriangleIcon className="h-6" />,
  className,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={`group inline-block ${
        className ? 'absolute' : 'relative'
      } ${className}`}
    >
      <div className="w-[200px] hidden absolute -translate-y-full -right-full px-4 py-2 bg-slate-600 text-slate-50 rounded-sm -top-2 group-hover:inline before:content before:absolute before:border-[9px] before:border-l-transparent before:border-r-transparent before:border-b-transparent before:border-slate-600 before:top-full before:-translate-y-[1px] before:scale-x-[0.8] before:right-7">
        {Array.isArray(content) ? (
          <div className="flex flex-col gap-2">
            {content.map((item, idx) => (
              <p key={idx} className="flex gap-3">
                <span>
                  <i className="w-2 h-2 bg-slate-50 inline-block rounded" />
                </span>
                <span className="leading-[20px]">{item}</span>
              </p>
            ))}
          </div>
        ) : (
          <p className="flex gap-3">
            <span>
              <i className="w-2 h-2 bg-slate-50 inline-block rounded" />
            </span>
            <span className="leading-[24px]">{content}</span>
          </p>
        )}
      </div>
      <span className="text-slate-600">{icon}</span>
    </div>
  );
};

export default Tooltip;
