import { useSelector } from 'react-redux';
import { type TypedUseSelectorHook } from 'react-redux';
import { type RootState } from '@/app/_commons/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
