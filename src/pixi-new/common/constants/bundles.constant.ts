export interface IBundle {
    alias: string;
    manifest: Record<string, string>;
}

export const bundles:IBundle[] = [
    {
        alias: 'slot',
        manifest: {
            symbols: '/assets/slot/slot-symbols.json',
            symbol_1: '/assets/slot/symbols/1.png',
            symbol_2: '/assets/slot/symbols/2.png',
            symbol_3: '/assets/slot/symbols/3.png',
            symbol_4: '/assets/slot/symbols/4.png',
            symbol_5: '/assets/slot/symbols/5.png',
            symbol_6: '/assets/slot/symbols/6.png',
            symbol_7: '/assets/slot/symbols/7.png',
            spritesheet_1: '/assets/slot/spritesheet/coin_yellow.json',
            spritesheet_2: '/assets/slot/spritesheet/coin_green.json',
            spritesheet_3: '/assets/slot/spritesheet/Green.json',
        }
    }
]