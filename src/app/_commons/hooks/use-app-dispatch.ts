import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@/app/_commons/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
