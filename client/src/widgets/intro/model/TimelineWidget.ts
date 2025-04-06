export interface TimelineItem {
  id: number;
  title: string;
  period: string;
  description?: string;
  position: 'left' | 'right';
}
