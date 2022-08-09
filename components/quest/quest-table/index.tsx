import { twMerge } from 'tailwind-merge';
import React, { useState } from 'react';

interface TableColumnsProps {
  title: string | React.ReactElement;
  key: string;
  render?: any;
  desRender?: any;
}

interface TableProps {
  dataSource: Array<any>;
  columns: Array<TableColumnsProps>;
  expandable?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  colClassName?: string;
}

export default function Table({
  className,
  headerClassName,
  colClassName,
  dataSource = [],
  columns = [],
  expandable,
}: TableProps) {
  const [expandIndex, setExpandedIndex] = useState<any>([]);

  const onExpand = (index: number) => {
    if (!expandIndex.includes(index)) {
      setExpandedIndex([...expandIndex, index]);
    } else {
      setExpandedIndex(expandIndex.filter((_: any) => _ !== index));
    }
  };

  return (
    <div className="w-full">
      <table
        className={
          className ||
          'w-full border-collapse border rounded-[17px] overflow-hidden backdrop-opacity-40 table-fixed'
        }
      >
        <thead>
          <tr className={headerClassName || 'bg-[#FBF9F2] border border-neutral-200 h-[72px]'}>
            {columns.map((c: any) => {
              if (!expandable && c.key === 'expand')
                return (
                  <th
                    key={c.key}
                    className="font-semibold text-neutral-900 text-left first:pl-[50px] last:pr-[50px] first:w-[260px]"
                  ></th>
                );
              return (
                <th
                  key={c.key}
                  className="font-semibold text-neutral-900 text-left first:pl-[50px] last:pr-[50px] first:w-[260px]"
                >
                  {c.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((d: any, index: number) => {
              return (
                <>
                  <tr
                    key={index}
                    className={twMerge('bg-[#F7F5EF] border border-neutral-200 h-20', colClassName)}
                  >
                    {columns.map((c: any) => {
                      if (!expandable && c.key === 'expand')
                        return (
                          <th
                            key={`${index}-${c.key}`}
                            className={'first:pl-[50px] last:pr-[50px]'}
                          />
                        );
                      return (
                        <th key={`${index}-${c.key}`} className={'first:pl-[50px] last:pr-[50px]'}>
                          {c.key === 'expand'
                            ? c.render(() => onExpand(index), expandIndex.includes(index), d[c.key])
                            : c.render
                            ? c.render(d[c.key])
                            : d[c.key]}
                        </th>
                      );
                    })}
                  </tr>
                  {expandable && expandIndex.includes(index) && (
                    <tr
                      key={index}
                      className={colClassName || 'bg-[#F7F5EF] h-20 px-[50px] w-full'}
                    >
                      <td colSpan={columns.length} className="px-[50px] markdown-wrapper ql-snow">
                        {columns[columns.length - 1]?.desRender(dataSource[index].description)}
                      </td>
                    </tr>
                  )}
                </>
              );
            })
          ) : (
            <tr className={colClassName || 'bg-[#F7F5EF] h-20 px-[50px] w-full'}>
              <td
                colSpan={columns.length}
                className="px-[50px] text-center tex-[#ABABAB] markdown-wrapper"
              >
                N/A
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
