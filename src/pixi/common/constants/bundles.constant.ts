export interface IBundle {
    alias: string;
    manifest: Record<string, string>;
}

export const bundles:IBundle[] = [
    {
        alias: 'slot',
        manifest: {
            symbols: '/assets/slot/slot-symbols.json',
        }
    }
]