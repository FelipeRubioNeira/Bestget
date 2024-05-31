/**
 * StoreHooks.tsx
 * 
 * StoreHooks.tsx is a file that contains the custom hooks for the redux store.
 * 
 * Explanation:
 * 
 * 1. We import the useDispatch and useSelector hooks from react-redux.
 * 2. We import the RootState and AppDispatch types from the store.
 * 3. We create two custom hooks: useAppSelector and useAppDispatch.
 * 4. We use the useSelector.withTypes and useDispatch.withTypes to define the types of the store.
 * 
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './redux/Store'


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();