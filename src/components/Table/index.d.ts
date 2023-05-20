import type { ReactNode } from 'react'
import type { Column } from 'react-table'

export type RenderCell = ReactNode | FC;

export interface ITableProps<T> {
  data: Array<T>;
  columns: Array<Column<T>>;
  loading?: boolean;
  loadingCard?: ReactNode | FC;
  loadingCardSM?: ReactNode | FC;
  loadingCardCount?: number;
  renderCell: RenderCell;
  renderCellSM?: RenderCell;
  renderCellMD?: RenderCell;
  footer?: ReactNode | FC;
  header?: ReactNode;
  theadClasses?: string;
  theadSMClasses?: string;
}

export type IRenderCellFn = (size: SIZES | undefined, data: {
  renderCell: RenderCell;
  renderCellSM: RenderCell;
}) => RenderCell;
