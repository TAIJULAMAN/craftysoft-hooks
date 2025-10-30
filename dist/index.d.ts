import * as react from 'react';

declare function useLocalStorage<T>(key: string, initialValue: T): readonly [T, react.Dispatch<react.SetStateAction<T>>];

declare function useDebounce<T>(value: T, delay?: number): T;

declare function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void;

declare function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void): void;

declare function useCopyToClipboard(): {
    copiedText: string | null;
    copy: (text: string) => Promise<boolean>;
};

declare function useMediaQuery(query: string): boolean;

declare function useWindowSize(): {
    width: number;
    height: number;
};

export { useClickOutside, useCopyToClipboard, useDebounce, useLocalStorage, useMediaQuery, useThrottle, useWindowSize };
